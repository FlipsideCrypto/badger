# Generated by Django 4.1.1 on 2022-10-03 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("badge", "0005_alter_badge_options_rename_created_at_badge_created_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="badge",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
    ]
