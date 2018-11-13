import unittest
import numpy as np
from lib.ball import *

class BallTest(unittest.TestCase):

    def setUp(self):
        self.ball = Ball(20, 20, 1, 1, 10, 600, 900)
        self.ball_left_goal = Ball(595, 20, -1, 1, 10, 600, 900)
        self.ball_right_goal = Ball(3, 20, 1, 1, 10, 600, 900)
        self.colliding_ball = Ball(300, 889, 1, 1, 10, 600, 900)

    def test_step(self):
        self.ball.step()
        self.assertTrue((self.ball.position == np.array([21, 21])).all())

    def test_check_collisions(self):
        self.ball.check_collisions()
        self.assertTrue((self.ball.velocity == np.array([1, 1])).all())

    def test_check_collisions_colliding_ball(self):
        self.colliding_ball.step()
        self.assertTrue((self.colliding_ball.velocity == np.array([1, -1])).all())

    def test_reset_position(self):
        self.ball.reset_position()
        self.assertTrue((self.ball.position == np.array([300, 450])).all())

    def test_check_for_goals_no_goals(self):
        self.assertEqual(self.ball.check_for_goals(), [0, 0])

    def test_check_for_goals_left_goal(self):
        self.assertEqual(self.ball_left_goal.check_for_goals(), [1, 0])
    
    def test_check_for_goals_right_goal(self):
        self.assertEqual(self.ball_right_goal.check_for_goals(), [0, 1])

