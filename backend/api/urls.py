from django.urls import include, path

urlpatterns = [
    path("v1/", include(("api.v1.urls", "api.v2"), namespace="api.v2")),
]
