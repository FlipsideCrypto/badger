# Generated by Django 4.1.7 on 2023-03-17 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("module", "0004_module_module_config"),
    ]

    operations = [
        migrations.AlterField(
            model_name="module",
            name="module_config",
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]