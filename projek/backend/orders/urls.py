from django.urls import path
from .views import OrderListCreateView, OrderStatusUpdateView

urlpatterns = [
    path("", OrderListCreateView.as_view(), name="order-list-create"),
    path("<int:pk>/status/", OrderStatusUpdateView.as_view(), name="order-status-update"),
]
