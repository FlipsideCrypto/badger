# Generated by Django 4.1.1 on 2022-09-30 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0006_alter_organization_chain_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='contract_address',
            field=models.CharField(default='0x0', max_length=50),
            preserve_default=False,
        ),
    ]
