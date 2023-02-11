from django.contrib import admin

# Register your models here.
from .models import Helper, Problem

admin.site.register(Helper)
admin.site.register(Problem)