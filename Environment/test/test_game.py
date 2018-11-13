import unittest
from unittest import mock
import numpy as np
from lib.game import *

class GameTest(unittest.TestCase):

    def setUp(self):
        paddleMock = mock.Mock()
        ballMock = mock.Mock()
        self.game = Game(100, 1, paddle_type=paddleMock, ball_type=ballMock)
        self.game.ball.check_for_goals.return_value = [0,0]

    def test_step(self):
        self.game.step()
        self.game.ball.step.assert_called()
        self.game.left_paddle.step.assert_called()
        self.game.right_paddle.step.assert_called()

    def test_goal_response(self):
        self.game.ball.check_for_goals.return_value = [1,0]
        self.game.step()
        self.game.ball.reset_position.assert_called()

    def test_left_ball_paddle_collision(self):
        self.game.ball.position = np.array([8, 100])
        self.game.ball.velocity = np.array([-1, 0])
        self.game.ball.radius = 10
        self.game.left_paddle.position = np.array([0, 90])
        self.game.left_paddle.thickness = 10
        self.game.left_paddle.length = 10
        self.game.right_paddle.position = np.array([505, 90])
        self.game.check_ball_paddle_collision()
        self.assertTrue((self.game.ball.velocity == np.array([1,0])).all())

    def test_right_ball_paddle_collision(self):
        self.game.ball.position = np.array([500, 100])
        self.game.ball.velocity = np.array([1, 0])
        self.game.ball.radius = 10
        self.game.left_paddle.position = np.array([0, 90])
        self.game.right_paddle.position = np.array([505, 90])
        self.game.right_paddle.thickness = 10
        self.game.right_paddle.length = 20
        self.game.check_ball_paddle_collision()
        self.assertTrue((self.game.ball.velocity == np.array([-1,0])).all())
