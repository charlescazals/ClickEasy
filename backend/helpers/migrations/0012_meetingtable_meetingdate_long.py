# Generated by Django 3.1.7 on 2021-04-11 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helpers', '0011_helper_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='meetingtable',
            name='meetingdate_long',
            field=models.CharField(default='', max_length=70),
        ),
    ]
