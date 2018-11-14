import unittest
from lib.memory import Memory

class MemoryTest(unittest.TestCase):

    def setUp(self):
        self.memory = Memory(1)

    def test_add_memory(self):
        self.memory.add_memory("string")
        self.assertEqual(self.memory.buffer, ["string"])

    def test_memory_fill(self):
        self.memory.add_memory("string 1")
        self.memory.add_memory("string 2")
        self.assertEqual(self.memory.buffer, ["string 2"])

    def test_sample_memory(self):
        self.memory.add_memory("string")
        taken_sample = self.memory.sample_memory(3)
        self.assertEqual(taken_sample, ["string"])
