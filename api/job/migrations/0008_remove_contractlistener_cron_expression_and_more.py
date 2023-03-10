# Generated by Django 4.1.1 on 2022-10-18 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("job", "0007_alter_contractlistener_chain"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contractlistener",
            name="cron_expression",
        ),
        migrations.RemoveField(
            model_name="contractlistener",
            name="event",
        ),
        migrations.RemoveField(
            model_name="contractlistener",
            name="event_abi",
        ),
        migrations.AddField(
            model_name="contractlistener",
            name="abi",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="contractlistener",
            name="updated",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
