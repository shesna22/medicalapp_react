from .models import medicine_register
from django import forms

class Updateform(forms.ModelForm):
    
    class Meta:
        model = medicine_register
        fields = ['name','company','expiry_date']
