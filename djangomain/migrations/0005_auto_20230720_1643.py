# Generated by Django 2.2.28 on 2023-07-20 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangomain', '0004_auto_20230720_1534'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine_register',
            name='expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]