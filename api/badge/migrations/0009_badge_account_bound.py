# Generated by Django 4.1.1 on 2022-10-05 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('badge', '0008_alter_badge_signer_ethereum_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='badge',
            name='account_bound',
            field=models.BooleanField(default=False),
        ),
    ]