from django.db import models

# Create your models here.


class Car(models.Model):
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    serial = models.CharField(max_length=255)
    number_plate = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Car({self.make}, {self.model}, {self.color}, {self.number_plate})"

    class Meta:
        ordering = ("-created_at",)
