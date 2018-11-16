import unittest
import tensorflow as tf
import numpy as np
from unittest import mock
from lib.trainer import Trainer

class TrainerTest(unittest.TestCase):

    def setUp(self):
        gameMock = mock.Mock()
        sessionMock = mock.Mock()
        memoryMock = mock.Mock()
        networkMock = mock.Mock()
        competitorMock = mock.Mock()
        self.trainer = Trainer(gameMock, sessionMock, memoryMock, networkMock, competitorMock, 1, 0, 0.5, 0.9)

    def test_computed_action(self):
        self.trainer.network.single_prediction.return_value = [1,0,0]
        state = { 'first': 0, 'second': 1 }
        self.assertEqual(self.trainer.computed_action(state), -1)
