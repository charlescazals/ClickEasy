# Generated by Django 3.1.7 on 2021-03-23 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helpers', '0008_auto_20210323_1528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='helper',
            name='available',
            field=models.CharField(default='', max_length=5000),
        ),
    ]