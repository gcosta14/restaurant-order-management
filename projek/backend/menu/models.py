from django.db import models

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ("entradas", "Entradas"),
        ("sopas", "Sopas"),
        ("carne", "Carne"),
        ("peixe", "Peixe"),
        ("sobremesa", "Sobremesa"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    ingredients = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.category})"