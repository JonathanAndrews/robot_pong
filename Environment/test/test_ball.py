import unittest
import numpy as np
from lib.ball import *

class BallTest(unittest.TestCase):

    def setUp(self):
        self.ball = Ball(20, 20, 1, 1, 10, 600, 900)
        self.colliding_ball = Ball(589, 20, 1, 1, 10, 600, 900)

    def test_step(self):
        self.ball.step()
        self.assertTrue((self.ball.position == np.array([21, 21])).all())

    def test_check_collisions(self):
        self.ball.check_collisions()
        self.assertTrue((self.ball.velocity == np.array([1, 1])).all())

    def test_check_collisions_colliding_ball(self):
        self.colliding_ball.step()
        self.assertTrue((self.colliding_ball.velocity == np.array([-1, 1])).all())
