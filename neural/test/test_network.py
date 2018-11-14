import unittest
from lib.network import Network

class NetworkTest(unittest.TestCase):

    def setUp(self):
        self.network = Network(2, 5, 5)

    def test_define_placeholders(self):
        self.network.states = self.network.q_values = self.network.dropout = None
        self.network.define_model()
        for parameter in [self.network.states, self.network.q_values, self.network.dropout]:
            self.assertNotEqual(None, parameter)
            
