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
