import unittest
import numpy as np
from lib.paddle import *

class BallTest(unittest.TestCase):

    def setUp(self):
        self.paddle = Paddle(20, 0, 10, 10)
        self.aipaddle = Paddle(20, 1, 10, 10)
        self.colliding_paddle = Paddle(573, 0, 10, 10)
        self.ai_colliding_paddle = Paddle(573, 1, 10, 10)

    def test_step(self):
        self.paddle.step(action=-1)
        self.assertTrue((self.paddle.position == np.array([10, 10])).all())

    def test_step_ai_paddle(self):
        self.aipaddle.step(action=-1)
        self.assertTrue((self.aipaddle.position == np.array([880, 10])).all())

    def test_check_boundaries(self):
        self.colliding_paddle.step(action=1)
        self.assertTrue((self.colliding_paddle.position == np.array([10, 580])).all())

    def test_check_ai_boundaries(self):
        self.ai_colliding_paddle.step(action=1)
        self.assertTrue((self.ai_colliding_paddle.position == np.array([880, 580])).all())
