class Transformer:
    def handle_events(self, events):
        events = [event for event_bundle in events for event in event_bundle]

        return events
