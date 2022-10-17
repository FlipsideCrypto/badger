from web3 import Web3

class Transformer:
    TOPIC_EVENTS = {
        "0xeee606ebce70b7433a244f41b4929cb0d7274e17bc07c07a110190ed3f0ee217": [
            "BadgeUpdated",
            "tuple(uint256,string,tuple(bytes32,uint256))"
        ],
    }

    def toDict(self, dictToParse):
        # convert any 'AttributeDict' type found to 'dict'
        parsedDict = dict(dictToParse)
        for key, val in parsedDict.items():
            # check for nested dict structures to iterate through
            if 'dict' in str(type(val)).lower():
                parsedDict[key] = self.toDict(val)
            # convert 'HexBytes' type to 'str'
            elif 'HexBytes' in str(type(val)):
                parsedDict[key] = val.hex()
        return parsedDict

    def decode_args(self, data, schema):
        # decode the data using the schema
        # schema = "tuple(uint256,string,tuple(bytes32,uint256))"

        # convert a topic data emitted from event like using keccak256k
        # 0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005168747470733a2f2f6261646765722e6d7970696e6174612e636c6f75642f697066732f516d535a71577a794459424b64397a5656576539487373763357716472743747624433417a655831386f4775654d000000000000000000000000000000
        # to an array using the schema of:
        # "tuple(uint256,string,tuple(bytes32,uint256))"

        print('data to turn into bytes', data)

        # convert data to bytes
        DATA = Web3.toBytes(hexstr=data)

        print('DATA to recover from', DATA)

        # decode the data emitted from the event into an array using web3 decodeParameters
        args = Web3().codec.decode_abi(["(uint256,string,(bytes32,uint256))"], DATA)

        print('did compile')

        print('ARGS', args)

        # format decoded data into a dict
        return args

    def decode_event(self, event):
        # copy event
        # convert event to new dict

        # copy all of the data from one dict to another
        decoded_event = self.toDict(event)

        hex_signature = event['topics'][0].hex()

        topic = self.TOPIC_EVENTS[hex_signature]

        decoded_event['event'] = topic[0]

        # copy the data of event into decoded_event

        # TODO: Decode the args and add them to the dict
        decoded_event['args'] = self.decode_args(event['data'], topic[1])

        print('decoded', decoded_event)

        return decoded_event

    def handle_events(self, events):
        # for event_bundle in events:
        #     for i, event in enumerate(event_bundle):
        #         if 'event' not in event:
        #             print("Decoding event", event)
        #             events[i] = self.decode_event(event)

        #             if 'event' not in events[i]:
        #                 print("RED ALERT SOMETHING BROKE", events[i])
        #         else:
        #             print('event already decoded', event)

        # squish events into one list
        events = [event for event_bundle in events for event in event_bundle]

        print("pre transforme", events)
        for i, event in enumerate(events):
            if 'event' not in event:
                print('need to decode event', event)
                events[i] = self.decode_event(event)

        print("Transformed events", events)

        return events
