from api.v1 import views
from django.urls import path

urlpatterns = [
    path("", views.CarListView.as_view(), name="index"),
]
