from web3 import Web3

from utils.web3 import w3

class ListenerReference:
    def summedAddress(self, address):
        if not Web3.isChecksumAddress(address):
            address = Web3.toChecksumAddress(address)

        return address

    def connected_contract(self, event_address, abi):
        if not hasattr(self, event_address):
            setattr(self, event_address, w3.eth.contract(
                address=event_address,
                abi=abi
            ))

        return getattr(self, event_address)

    def _logs(self, contract_addresses, from_block, to_block):
        return w3.eth.get_logs({
            'address': contract_addresses,
            'fromBlock': from_block,
            'toBlock': to_block
        })

    def logs(self, contract_addresses, from_block, to_block):
        contract_addresses_key = ''.join(contract_addresses)
        key_hash = f"{contract_addresses_key}{from_block}{to_block}"

        if not hasattr(self, key_hash):
            setattr(self, key_hash, self._logs(contract_addresses, from_block, to_block))