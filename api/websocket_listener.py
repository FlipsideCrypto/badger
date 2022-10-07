import asyncio
import json
import requests
import websockets

from web3 import Web3

RPC_URL = "wss://eth-mainnet.g.alchemy.com/v2/7hOvTTdNWW7ngDBuxt0RI4h91giaqhxP"

ERC20_AND_ERC721_TRANSFER = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

users = [
    '0x8D572a89Ca4C939CDfB43F224A233c9E35e08c9C'
    '0x8D572a89Ca4C939CDfB43F224A233c9E35e08c9C'
]

# function reconnectingWebsocket(url) {
#   return new Web3(
#     new Web3.providers.WebsocketProvider(url, {
#       timeout: 30 * 1000,

#       clientConfig: {
#         keepalive: true,
#         keepaliveInterval: 60000,
#       },

#       reconnect: {
#         auto: true,
#         delay: 5000,
#         maxAttempts: 50,
#         onTimeout: true,
#       },
#     }),
#   );
# }

mainnet = Web3.WebsocketProvider(RPC_URL)

def topic(provider, address):
    # encode the address with the mainnet provider
    address = provider.encodeABI('address', [address])

    # create the topic
    topic = provider.encodeABI('bytes32', [ERC20_AND_ERC721_TRANSFER])

    # return the topic
    return [topic, [address]]


async def main():
    print('in main')

    topicsList = [
        [ERC20_AND_ERC721_TRANSFER, {

        }],
    ]

    async with websockets.connect(RPC_URL) as ws:
        await ws.send(json.dumps({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_subscribe",
            "params": ["logs", {
                "address": "0x8D572a89Ca4C939CDfB43F224A233c9E35e08c9C",
                "topics": topicsList
            }]
        }))

        print('sent')
        while True:
            response = await ws.recv()
            print(response)

if __name__ == "__main__":
    asyncio.run(main())
