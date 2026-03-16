from rest_framework import serializers
from .models import Order, OrderLine
from menu.models import MenuItem
from menu.serializers import MenuItemSerializer


class OrderLineReadSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)

    class Meta:
        model = OrderLine
        fields = ["id", "menu_item", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    lines = OrderLineReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "table_number", "status", "created_at", "lines"]


class CreateOrderLineSerializer(serializers.Serializer):
    menu_item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class CreateOrderSerializer(serializers.Serializer):
    table_number = serializers.IntegerField(min_value=1)
    items = CreateOrderLineSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("O pedido deve conter pelo menos um item.")

        for item in value:
            if not MenuItem.objects.filter(id=item["menu_item_id"]).exists():
                raise serializers.ValidationError(
                    f"Menu item com id {item['menu_item_id']} não existe."
                )

        return value

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)

        for item in items_data:
            menu_item = MenuItem.objects.get(id=item["menu_item_id"])

            OrderLine.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=item["quantity"]
            )

        return order


class UpdateOrderStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)
