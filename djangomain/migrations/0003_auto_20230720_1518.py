# Generated by Django 2.2.28 on 2023-07-20 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangomain', '0002_auto_20230720_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine_register',
            name='expiry_date',
            field=models.DateField(),
        ),
    ]
