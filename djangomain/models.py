from django.db import models
from datetime import date

class medicine_register(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=200,null=True)
    company= models.CharField(max_length=200,null=True)  
    expiry_date=models.DateField(null=True,blank=True) 

    @property
    def is_date(self):
        if self.expiry_date and date.today()>self.expiry_date:
            return True
        return False
    
    def __str__(self):
        return self.name