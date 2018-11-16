import numpy as np
import random

class Memory:
    ''' The memory for our AI '''

    def __init__(self, memory_size):
        self.buffer = []
        self.memory_size = memory_size

    def add_memory(self, memory):
        self.buffer += [memory]
        if len(self.buffer) > self.memory_size:
            self.buffer = self.buffer[1:]

    def sample_memory(self, size):
        size = min(size, len(self.buffer))
        return random.sample(self.buffer, size)
