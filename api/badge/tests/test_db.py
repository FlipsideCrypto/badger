from django.db.utils import IntegrityError
from django.test import TestCase

from badge.models import Badge
from user.models import User

from utils.tests.user import create_user

class BadgeTestCase(TestCase):
    def setUp(self):
        self.badge = Badge.objects.create(name="Test Badge", description="Test Description", image_hash="0x0")

        self.user = create_user()

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

    def test_badge_delegation_with_no_user(self):
        with self.assertRaises(ValueError):
            self.badge.delegate(None)

    # def test_badge_delegation(self):
    #     self.assertEqual(str(self.badge), "Test Badge")

    #     self.assertEqual(user.organizations.count(), 0)
    #     self.assertNotEqual(user, None)
    #     self.badge.delegate(user)

    #     self.assertEqual(self.badge.delegates.filter(pk=user.pk).count(), 1)
    
    #     self.badge.delegate(User.objects.get(pk=user.pk))

    #     with self.assertRaises(ValueError):
    #         self.badge.delegate(user)

    # def test_badge_undelegation(self):
    #     user = create_user()
    #     self.badge.delegate(user)

    #     self.assertEqual(self.badge.delegates.filter(pk=user.pk).count(), 1)
        
    #     self.badge.undelegate(user)

    #     self.assertEqual(self.badge.delegates.filter(pk=user.pk).count(), 0)
        
    #     with self.assertRaises(ValueError):
    #         self.badge.undelegate(user)