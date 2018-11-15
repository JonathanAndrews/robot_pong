import random
import numpy as np

class Trainer:
    '''The trainer of the neural network, using the game created'''

    def __init__(self, game, session, memory, network, competitor , max_epsilon, min_epsilon, epsilon_decay, gamma):
        self.game = game
        self.session = session
        self.memory = memory
        self.network = network
        self.competitor = competitor
        self.max_epsilon = max_epsilon
        self.min_epsilon = min_epsilon
        self.epsilon = max_epsilon
        self.epsilon_decay = epsilon_decay
        self.gamma = gamma

    def run_game(self):
        user_state = self.game.return_user_state()
        competitor_state = self.game.return_competitor_state()

        while True:
            user_action = self.user_action(user_state)
            competitor_action = self.computed_action(competitor_state)
            self.game.step(user_action, competitor_action)

            new_user_state = self.return_user_state()
            reward = self.calculate_reward(new_user_state)
            done = (new_user_state['time-remaining'] <= 0)

            self.add_sample(user_state, new_user_state, reward, user_action, done)
            # update_epsilon
            # replay_memories
            # break_if_game_over








    def user_action(self, state):
        if random.random() < self.epsilon:
            return random.choice(self.game.POSSIBLE_MOVES)
        else:
            return self.computed_action(state)

    def computed_action(self, state):
        state_values = np.array([value for value in state.values()])
        return np.argmax(self.network.single_prediction(state_values, self.session)) - 1

    def calculate_reward(self, state):
        if state['time-remaining'] <= 0:
            if state['score'] > 0:
                return 1.0
            else if state['score'] < 0:
                return -1.0
        return 0.0

    def add_sample(self, user_state, new_user_state, reward, action, done):
        if done:
            self.memory.add_memory((user_state, None, reward, action))
        else:
            self.memory.add_memory((user_state, new_user_state, reward, action))
