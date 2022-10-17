class Transformer:
    def handle_events(self, events):
        # squish events into one list
        events = [event for event_bundle in events for event in event_bundle]

        return events
