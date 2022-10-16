# The Config controller of the smart contract event indexer

class Config:
    def __init__(self):
        self.extractors = []
        self.transformer = None
        self.indexer = None

    def add_extractor(self, extractor):
        self.extractors.append(extractor)

    def set_transformer(self, transformer):
        self.transformer = transformer

    def set_indexer(self, indexer):
        self.indexer = indexer

    def get_extractors(self):
        return self.extractors

    def get_transformer(self):
        return self.transformer

    def get_indexer(self):
        return self.indexer