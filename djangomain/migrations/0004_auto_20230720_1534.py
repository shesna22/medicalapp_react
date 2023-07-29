# Generated by Django 2.2.28 on 2023-07-20 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangomain', '0003_auto_20230720_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine_register',
            name='company',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='medicine_register',
            name='expiry_date',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='medicine_register',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='medicine_register',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
