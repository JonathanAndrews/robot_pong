import unittest
import numpy as np
from lib.paddle import *

class PaddleTest(unittest.TestCase):

    def setUp(self):
        self.paddle = Paddle(70, 0, 0, 10)
        self.colliding_paddle = Paddle(573, 0, 0, 10)

    def test_step(self):
        self.paddle.step(action=-1)
        self.assertTrue((self.paddle.position == np.array([10, 64])).all())

    def test_check_boundaries(self):
        self.colliding_paddle.step(action=1)
        self.assertTrue((self.colliding_paddle.position == np.array([10, 540])).all())
