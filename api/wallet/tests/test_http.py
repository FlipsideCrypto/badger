# TODO: Login a user
# TODO: Test the retrieval

from django.shortcuts import reverse

from rest_framework.test import APITestCase
from siwe.siwe import SiweMessage
from web3 import Web3, EthereumTesterProvider

from utils.tests.user import PASSWORD, create_user

from wallet.models import Wallet 

class UserHttpTest(APITestCase):
    def setUp(self):
        user = create_user()
        response = self.client.get(reverse('siwe_auth:nonce'))
        response = response.json()
        nonce = response['nonce']

        domain = 'http://localhost:8000'
        address = user.ethereum_address
        statement = 'I am signing my one-time nonce'
        uri = f'{domain}/api/auth/nonce?address={address}&nonce={nonce}&statement={statement}'
        version = '1'
        chain = '1'

        # Sign the message
        self.siwe = SiweMessage({
            'domain': domain,
            'address': address,
            'nonce': nonce,
            'statement': statement,
            'uri': uri,
            'version': version,
            'chain': chain
        })

        print(self.siwe)

        # self.w3 = Web3(EthereumTesterProvider())
        # w3_account = web3.eth.accounts.create()
        # signed_message = w3_account.sign(self.siwe, private_key=w3_account.privateKey)

        # response = self.client.post(
        #     reverse('login'),
        #     data = {
        #         'message': message,
        #         'signature': signature
        #     },
        #     format = 'json',
        # )

        # response = self.client.post(reverse('log-in'), data={
        #     'username': user.username,
        #     'password': PASSWORD,
        # })

        # self.access = response.data['access']

    def test_can_get_nonce(self):
        response = self.client.get(reverse('siwe_auth:nonce'))
        response = response.json()
        nonce = response['nonce']

        return self.assertNotEqual(nonce, None)


    # def test_can_login(self):
    #     pass

    # def test_can_retrieve_user(self):
    #     pass

    # def test_can_list_users(self):
    #     response = self.client.get(
    #        reverse('user-list'),
    #        HTTP_AUTHORIZATION = f'Bearer {self.access}',
    #     )
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.data[0].ethereum_address, user.ethereum_address)

    # def test_can_create_user(self):
    #     response = self.client.post(
    #         reverse('user-create'),
    #         data = {
    #          'ethereum_address': '0x0000000000000000000000000000000000000000',
    #         },
    #     )
    #     self.assertEqual(response.status_code, 201)

    # def test_can_delete_user(self):
    #     response = self.client.delete(
    #         reverse(
    #           'user-delete', 
    #           kwargs = {'ethereum_address': '0x0000000000000000000000000000000000000000'}
    #        ),
    #     )
    #     self.assertEqual(response.status_code, 204)

    # def test_can_partial_update_user(self):
    #     response = self.client.patch(
    #         reverse(user-update', kwargs = {'ethereum_address': user.ethereum_address}),
    #         data = {
    #             
    #     pass

    # def test_can_update_user(self):
    #     pass

    # def test_can_retrieve_user_organizations(self):
    #     pass

    # def test_can_retrieve_user_tutorial_state(self):
    #     pass

    # def test_can_retrieve_user_badges(self):
    #     response = self.client.get(
    #         reverse('user-list'), kwargs={'address': user.ethereum_address}
    #     pass

    # def test_can_retrieve_user_delegates(self):
    #     pass