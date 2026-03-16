from django.db import models
from menu.models import MenuItem


class Order(models.Model):
    STATUS_CHOICES = [
        ("order_preview", "Order Preview"),
        ("preparing", "Preparing"),
        ("cooling_down", "Cooling Down"),
        ("ready_to_serve", "Ready to Serve"),
        ("concluded", "Concluded"),
    ]

    table_number = models.PositiveIntegerField()
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="order_preview"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    concluded_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - Mesa {self.table_number}"


class OrderLine(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="lines"
    )
    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.CASCADE,
        related_name="order_lines"
    )
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity}x {self.menu_item.name} (Order {self.order.id})"