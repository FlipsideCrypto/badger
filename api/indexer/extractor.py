from .references import ListenerReference

class Extractor(ListenerReference):
    def extract(self, contract_addresses, abi, topics, from_block, to_block):
        events = self.logs(contract_addresses, from_block, to_block) 

        if not contract_addresses or len(contract_addresses) == 0:
            return []
        
        if not events or len(events) == 0:
            return []

        event_data = []

        for event in events:
            if 'topics' not in event:
                continue

            if len(event['topics']) == 0:
                continue

            event_topic = event['topics'][0].hex()

            if event_topic not in topics:
                continue

            event_address = event['address']
            
            if event_address not in contract_addresses:
                continue

            contract = self.connected_contract(event_address, abi)

            event_name = topics[event_topic].split('(')[0]

            event_data.append(contract.events[event_name]().processLog(event))

        return event_data