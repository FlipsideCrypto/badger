# Generated by Django 4.1.1 on 2022-09-30 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('badge', '0003_badge_delegates'),
        ('organization', '0004_rename_users_organization_delegates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='badges',
            field=models.ManyToManyField(to='badge.badge'),
        ),
    ]
