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

