# Generated by Django 4.1.1 on 2022-10-03 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("badge", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="badge",
            name="token_uri",
            field=models.CharField(default="", max_length=256),
        ),
    ]
