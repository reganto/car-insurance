from api.models import Car
from api.serializers import CarSerializer
from rest_framework import generics


class CarListView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarDeleteRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
