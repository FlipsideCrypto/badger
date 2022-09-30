from django.test import TestCase

from utils.tests.organization import create_organization
from utils.tests.user import create_user

from organization.models import Organization

class UserTestCase(TestCase):
    def setUp(self):
        self.user = create_user(
            username="test_user",
            address="0x0000000000000000000000000000000000000000",
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, "test_user")

    def test_user_organizations(self):
        create_organization(self.user)

        self.assertEqual(Organization.objects.filter(owner=self.user).count(), 1)
        self.assertEqual(self.user.organizations.count(), 1)

        self.assertEqual(self.user.tutorial_state, 1)

    def test_user_ens_name(self):
        user = create_user(
            username="test_ens_user",
            address="0x62180042606624f02D8A130dA8A3171e9b33894d"
        )

        self.assertEqual(user.ens_name, "nftchance.eth")