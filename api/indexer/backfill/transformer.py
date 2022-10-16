class Transformer:
    def handle_events(self, events):
        return [item for sublist in events for item in sublist]