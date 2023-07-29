from rest_framework import serializers
from djangomain.models import medicine_register


class MedicineListSerializer(serializers.ModelSerializer):
    class Meta:
        model= medicine_register
        fields="__all__"
