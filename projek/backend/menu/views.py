from rest_framework import generics
from .models import MenuItem
from .serializers import MenuItemSerializer

class MenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = MenuItem.objects.all().order_by("category", "name")
        category = self.request.query_params.get("category")

        if category:
            queryset = queryset.filter(category=category)

        return queryset
