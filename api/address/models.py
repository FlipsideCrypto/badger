from django import forms
from django.db import models

class AddressField(models.CharField):
    description = "Ethereum address"

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 42
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        del kwargs['max_length']
        return name, path, args, kwargs

    def formfield(self, **kwargs):
        defaults = {'form_class': AddressField}
        defaults.update(kwargs)
        return super().formfield(**defaults)

    def to_python(self, value):
        if isinstance(value, str):
            # Remove leading 0x
            if value.startswith('0x'):
                value = value[2:]

            # Add leading 0s
            if len(value) < 40:
                value = value.zfill(40)

            # Add leading 0x
            if not value.startswith('0x'):
                value = '0x' + value

        # TODO: May want to just automatically checksum everything

        return super().to_python(value)

    def get_prep_value(self, value):
        value = self.to_python(value)
        return super().get_prep_value(value)

    def validate(self, value, model_instance):
        super().validate(value, model_instance)

        # Validate address length
        if len(value) != 42:
            raise forms.ValidationError(
                self.error_messages['invalid'],
                code='invalid',
                params={'value': value},
            )

        # Validate address checksum
        if not value.islower() and not value.isupper():
            raise forms.ValidationError(
                self.error_messages['invalid'],
                code='invalid',
                params={'value': value},
            )