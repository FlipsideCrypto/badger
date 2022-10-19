class Transformer:
# ({
#     'address': '0x218B3C623FfB9c5E4DBb9142E6Ca6f6559F1c2D6', 
#     'blockHash': HexBytes('0xc84290d88e5af76d8a4a1085f7e1752feb0479d9b4054994befd0ade70ee36a8'), 
#     'blockNumber': 34471711, 
#     'data': '0x', 
#     'logIndex': 51, 
#     'removed': False, 
#     'topics': [
#         HexBytes('0x39e4fba473bee8eaa003d03e0707c05d0feae5f9b0e3d1f6b8566694c6ffc786'), 
#         HexBytes('0x000000000000000000000000ea051d8778598628dddca7a09c8aef3af9f0d2e5'), 
#         HexBytes('0x000000000000000000000000581bef12967f06f2ebfcabb7504fa61f0326cd9a'), 
#         HexBytes('0x000000000000000000000000c79f29c8b02ba02edb71c3dfe93ef6d6fa7ab2f0')
#     ], 
#     'transactionHash': HexBytes('0x5cead552200e4321714253078c00f5afc8c6fb9b171dfd9617ca38b3c346b24c'), 
#     'transactionIndex': 30}

    def transform(self, event):
        print(event)
        # decode topic detail
        event_name = event['topics'][0]
        event_data = event['data']
        event_address = event['address']
        event_block = event['blockNumber']

        print('Event name', event_name)
        print('Event data', event_data)
        print('Event address', event_address)
        print('Event block', event_block)

        return event

    def handle_events(self, events):
        # squish events into one list
        # events = [event for event_bundle in events for event in event_bundle]

        # transform events
        transformed_events = []
        for event in events:
            transformed_events.append(self.transform(event))

        print('Transformed events', transformed_events)

        return transformed_events
