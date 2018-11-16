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
        self.game.ball.position = np.array([8, 100])
        self.game.ball.velocity = np.array([-1, -2])
        self.game.left_paddle.position = np.array([0, 90])
        self.game.right_paddle.position = np.array([505, 90])
        self.game.left_paddle.speed = 1
        self.game.right_paddle.speed = 1
        self.game.ball.radius = 10
        self.game.right_paddle.thickness = 10
        self.game.right_paddle.length = 20
        self.game.left_paddle.thickness = 10
        self.game.left_paddle.length = 20

    def test_step(self):
        self.game.step()
        self.game.ball.step.assert_called()
        self.game.left_paddle.step.assert_called()
        self.game.right_paddle.step.assert_called()
        self.assertEqual(self.game.time_remaining, 99)

    def test_goal_response(self):
        self.game.ball.check_for_goals.return_value = [1,0]
        self.game.step()
        self.game.ball.reset_position.assert_called()

    def test_left_ball_paddle_collision(self):
        self.game.ball.velocity = np.array([-1, 1])
        self.game.check_ball_paddle_collision()
        self.assertTrue((self.game.ball.velocity == np.array([1, 0])).all())

    def test_right_ball_paddle_collision(self):
        self.game.ball.position = np.array([500, 100])
        self.game.ball.velocity = np.array([1, -2])
        self.game.check_ball_paddle_collision()
        self.assertTrue((self.game.ball.velocity == np.array([-1, 0])).all())

    def test_is_game_won(self):
        for i in range (101):
            self.game.step()
        self.assertEqual(self.game.game_over, True)

    def test_reset_game(self):
        self.game.step()
        self.game.reset_game()
        test_values = [self.game.time_remaining, self.game.refresh_time, self.game.game_over, self.game.score[0], self.game.score[1]]
        expected_values = [100, 1, False, 0, 0]
        self.assertEqual(test_values, expected_values)

    def test_possible_moves(self):
        self.assertEqual(self.game.POSSIBLE_MOVES, [-1, 0, 1])

    def test_return_user_state(self):
        self.game.left_paddle.position = self.game.right_paddle.position = np.array([0,1])
        self.game.left_paddle.velocity = self.game.right_paddle.velocity = np.array([0,1])
        self.game.ball.position = self.game.ball.velocity = np.array([0,1])
        output = self.game.return_user_state()
        expected_output = {
            'user-paddle-y': 1,
            'user-paddle-dy': 1,
            'comp-paddle-y': 1,
            'comp-paddle-dy': 1,
            'ball-position-x': 0,
            'ball-position-y': 1,
            'ball-velocity-dx': 0,
            'ball-velocity-dy': 1,
            'time-remaining': 100,
            'score': 0
        }
        self.assertDictEqual(output, expected_output)

    def test_return_competitor_state(self):
        self.game.left_paddle.position = self.game.right_paddle.position = np.array([0,1])
        self.game.left_paddle.velocity = self.game.right_paddle.velocity = np.array([0,1])
        self.game.ball.position = self.game.ball.velocity = np.array([1,1])
        output = self.game.return_competitor_state()
        expected_output = {
            'user-paddle-y': 1,
            'user-paddle-dy': 1,
            'comp-paddle-y': 1,
            'comp-paddle-dy': 1,
            'ball-position-x': 899,
            'ball-position-y': 1,
            'ball-velocity-dx': -1,
            'ball-velocity-dy': 1,
            'time-remaining': 100,
            'score': 0
        }
        self.assertDictEqual(output, expected_output)
