import unittest
import tensorflow as tf
import numpy as np
from lib.network import Network

class NetworkTest(unittest.TestCase):

    def setUp(self):
        self.network = Network(2, 2)

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
        array = np.array([1, 2])
        prediction = self.network.single_prediction(array, test_session)
        self.assertEqual(self.network.no_actions, len(prediction[0]))

    def test_batch_prediction(self):
        test_session = tf.Session()
        test_session.run(self.network.variable_initializer)
        array = np.array([[1, 2],[3, 4]])
        prediction = self.network.batch_prediction(array, test_session)
        self.assertEqual(len(array), len(prediction))

    def test_batch_train(self):
        test_session = tf.Session()
        test_session.run(self.network.variable_initializer)
        input = np.array([1,2])
        first_prediction = self.network.single_prediction(input, test_session)
        training_inputs = np.array([[1, 2], [3, 4]])
        training_outputs = np.array([[0.1, 0.12], [0.323, 0.984]])
        self.network.batch_train(training_inputs, training_outputs, test_session)
        second_prediction = self.network.single_prediction(input, test_session)
        self.assertTrue((first_prediction != second_prediction).any())
