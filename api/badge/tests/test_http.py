# import datetime
# import django
# import time

# from django.contrib.auth.models import Permission

# from rest_framework import status
# from rest_framework.reverse import reverse
# from rest_framework.test import APITestCase

# from utils.tests.user import PASSWORD, create_user

# from coin.models import Coin

# from org.permission_constants import org_permissions
# from org.utils import load_permissions

# class HttpTest(APITestCase):
#     def setUp(self):
#         self.user = create_user()
#         response = self.client.post(
#             reverse("log-in"),
#             data={
#                 "username": self.user.username,
#                 "password": PASSWORD,
#             },
#         )

#         # Parse payload data from access token.
#         self.access= response.data["access"]

#         load_permissions("org", org_permissions)

#     def test_can_create_proposal(self):
#         response = self.client.post(
#             reverse("proposal-list"),
#             data={
#                 "title": "Test Proposal",
#                 "description": "Test proposal",
#                 "proposed_by": self.user.id,
#             },
#             HTTP_AUTHORIZATION=f"Bearer {self.access}"
#         )

#         print(response.data)
#         self.assertEqual(status.HTTP_201_CREATED, response.status_code)

#         proposal = Proposal.objects.get(title="Test Proposal")

#         self.assertEqual(response.data.get('id'), proposal.id)

#         self.assertEqual(response.data["description"], proposal.description)
#         self.assertEqual(response.data["status"], proposal.get_status())
#         self.assertEqual(response.data["votes_for"], 0)
#         self.assertEqual(response.data["votes_against"], 0)
#         self.assertEqual(response.data["votes_abstain"], 0)
#         self.assertEqual(response.data["votes_total"], 0)