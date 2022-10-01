from django.db.utils import IntegrityError
from django.test import TestCase

from utils.tests.organization import create_organization
from utils.tests.user import create_user

class OrganizationTestCase(TestCase):
    def setUp(self):
        self.user = create_user()
        self.organization = create_organization(self.user) 

    def test_can_create_org(self):
        create_organization(self.user, name="TEST ORGANIZATION")

    def test_cannot_create_org_with_no_chain(self):
        with self.assertRaises(IntegrityError):
            create_organization(self.user, chain=None)

    def test_cannot_create_org_with_no_contract_address(self):
        with self.assertRaises(IntegrityError):
            create_organization(self.user, contract_address=None)

    def test_cannot_create_org_with_no_name(self):
        with self.assertRaises(IntegrityError):
            create_organization(self.user, name=None)