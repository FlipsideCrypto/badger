from django.db.utils import IntegrityError
from django.test import TestCase

from badge.models import Badge

from utils.tests.organization import create_organization
from utils.tests.user import create_user

class BadgeTestCase(TestCase):
    def setUp(self):
        self.user = create_user()
        self.organization = create_organization(self.user)
        self.badge = Badge.objects.create(name="Test Badge", description="Test Description", image_hash="0x0")
        self.organization.badges.add(self.badge)
        self.organization.save()

    def test_badge_creation(self):
        badge = Badge.objects.create(name="Test Badge", description="Test Description", image_hash="0x0")
        self.assertEqual(badge.name, "Test Badge")
        self.assertEqual(badge.description, "Test Description")
        self.assertEqual(badge.image_hash, "0x0")

    def test_cannot_create_badge_with_no_name(self):
        with self.assertRaises(IntegrityError):
            Badge.objects.create(description="Test Description", image_hash="0x0")

    def test_cannot_create_badge_with_no_image_hash(self):
        with self.assertRaises(IntegrityError):
            Badge.objects.create(name="Test Badge", description="Test Description")