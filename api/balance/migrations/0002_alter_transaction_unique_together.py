# Generated by Django 4.1.7 on 2023-03-16 19:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("balance", "0001_initial"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="transaction",
            unique_together=set(),
        ),
    ]