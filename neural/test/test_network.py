import unittest
import tensorflow as tf
import numpy as np
from lib.network import Network

class NetworkTest(unittest.TestCase):

    def setUp(self):
        self.network = Network(5, 2)

    def test_define_placeholders(self):
        self.network.states = self.network.q_values = self.network.dropout = None
        self.network.define_model()
        for parameter in [self.network.states, self.network.q_values, self.network.dropout]:
            self.assertNotEqual(None, parameter)
            
    def test_define_variables(self):
        self.network.saver = self.network.neural_output = None
        self.network.define_model()
        for parameter in [self.network.saver, self.network.neural_output]:
            self.assertNotEqual(None, parameter)

    def test_define_utilities(self):
        self.network.loss = self.network.optimizer = self.network.variable_initializer = None
        self.network.define_model()
        for parameter in [self.network.loss, self.network.optimizer, self.network.variable_initializer]:
            self.assertNotEqual(None, parameter)
    
    def test_single_prediction(self):
        test_session = tf.Session()
        test_session.run(self.network.variable_initializer)
        array = np.array([1,2])
        prediction = self.network.single_prediction(array, test_session)
        self.assertEqual(self.network.no_actions, len(prediction[0]))

            

