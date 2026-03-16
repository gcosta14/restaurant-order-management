from rest_framework import generics, status
from rest_framework.response import Response
from .models import Order
from datetime import timedelta
from django.db.models import Q
from django.utils import timezone
from .serializers import (
    OrderSerializer,
    CreateOrderSerializer,
    UpdateOrderStatusSerializer,
)


class OrderListCreateView(generics.GenericAPIView):
    def get_queryset(self):
        cutoff_time = timezone.now() - timedelta(minutes=2)

        return Order.objects.filter(
            Q(status__in=["order_preview", "preparing", "cooling_down", "ready_to_serve"]) |
            Q(status="concluded", concluded_at__gte=cutoff_time)
        ).order_by("-created_at")

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer
        return OrderSerializer

    def get(self, request):
        orders = self.get_queryset()
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

class OrderStatusUpdateView(generics.GenericAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateOrderStatusSerializer

    def patch(self, request, pk):
        order = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_status = serializer.validated_data["status"]
        order.status = new_status

        if new_status == "concluded":
            order.concluded_at = timezone.now()
        else:
            order.concluded_at = None

        order.save()

        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data)