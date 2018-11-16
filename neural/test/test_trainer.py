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

    def test_calculate_reward_positive(self):
        state = { 'score': 1 }
        self.assertEqual(self.trainer.calculate_reward(state), 1.0)

    def test_calculate_reward_negative(self):
        state = { 'score': -1 }
        self.assertEqual(self.trainer.calculate_reward(state), -1.0)

    def test_calculate_reward_neutral(self):
        state = { 'score': 0 }
        self.assertEqual(self.trainer.calculate_reward(state), 0.0)

    def test_update_epsilon(self):
        initial_epsilon = self.trainer.epsilon
        self.trainer.total_steps += 1
        self.trainer.update_epsilon()
        after_epsilon = self.trainer.epsilon
        self.assertTrue(after_epsilon < initial_epsilon)

    def test_add_sample_done(self):
        memory = [[1,2,3], [2,3,4], 1, 2, False]
        self.trainer.add_sample(*memory)
        self.trainer.memory.add_memory.assert_called()

    def test_add_sample_not_done(self):
        memory = [[1,2,3], [2,3,4], 1, 2, True]
        self.trainer.add_sample(*memory)
        self.trainer.memory.add_memory.assert_called()

    def test_reward_predictions(self):
        self.trainer.network.batch_prediction.return_value = [0.1, 0.8, 0.1]
        self.trainer.reward_predictions([1,2,3],[2,3,4])
        self.trainer.network.batch_prediction.assert_called()

    def test_user_action_random(self):
        self.trainer.epsilon = 2
        self.trainer.game.POSSIBLE_MOVES = ['a', 'b', 'c']
        self.assertTrue(self.trainer.user_action({ 'x': 1 }) in self.trainer.game.POSSIBLE_MOVES)

    def test_user_action_random(self):
        self.trainer.epsilon = 0
        self.trainer.network.single_prediction.return_value = np.array([1, 0, 0])
        self.trainer.user_action({ 'x':1, 'y':2, 'z':3 })
        self.trainer.network.single_prediction.assert_called()

    def test_run_game(self):
        self.trainer.train_model = lambda : None
        self.trainer.update_epsilon =  lambda : None
        self.trainer.add_sample = lambda a,b,c,d,e : None
        self.trainer.return_user_state = lambda : None
        self.trainer.calculate_reward = lambda x: None
        self.trainer.user_action = lambda x : None
        self.trainer.computed_action = lambda x : None

        self.trainer.game.reset_game = lambda : None
        self.trainer.game.game_over = True
        self.trainer.game.step = lambda a,b : None
        self.trainer.game.return_competitor_state = lambda : None

        self.trainer.run_game()
        self.assertEqual([self.trainer.total_steps, self.trainer.current_score], [1,0])

    def test_train_model(self):
        self.trainer.memory.sample_memory.return_value = [[1,2,3,0]]
        self.trainer.reward_predictions = lambda x,y: [[[1]],[[1]]]
        self.trainer.network.no_inputs = self.trainer.network.no_actions = 1

        self.trainer.network.batch_train.return_value = [1]
        self.trainer.train_model()
        self.trainer.network.batch_train.assert_called()
