# Generated by Django 4.1.1 on 2022-11-03 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organization", "0013_alter_organization_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="organization",
            name="version",
            field=models.CharField(default="4.0", max_length=255),
        ),
    ]