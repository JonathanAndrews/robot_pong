import random
import numpy as np
import math

class Trainer:
    '''The trainer of the neural champion, using the game created'''

    def __init__(self, game, memory, champion, competitor, max_epsilon, min_epsilon,
                 epsilon_decay, gamma, returns_decay, winners_growth, returns_parameter=1 ,
                 winners_parameter=1, batch_size=32, display_reward=False):
        self.game = game
        self.memory = memory
        self.champion = champion
        self.competitor = competitor
        self.max_epsilon = max_epsilon
        self.min_epsilon = min_epsilon
        self.epsilon = max_epsilon
        self.epsilon_decay = epsilon_decay
        self.gamma = gamma
        self.total_steps = 0
        self.total_reward = 0
        self.batch_size = batch_size
        self.current_score = 0
        self.display_reward = display_reward
        self.returns_parameter = returns_parameter
        self.winners_parameter = winners_parameter
        self.returns_decay = returns_decay
        self.winners_growth = winners_growth

    def run_game(self):
        self.game.reset_game()

        champion_state = self.game.return_champion_state()
        competitor_state = self.game.return_competitor_state()

        while True:
            champion_action = self.champion_action(champion_state)
            competitor_action = self.competitor_action(competitor_state)
            self.game.step(competitor_action, champion_action)
            self.total_steps += 1

            new_champion_state = self.game.return_champion_state()
            reward = self.calculate_reward(new_champion_state)
            done = self.game.game_over
            if reward != 0 or random.random() > 0.95:
                if not done:
                    self.add_sample(champion_state, new_champion_state, reward, champion_action, done)

            self.update_epsilon()
            if len(self.memory.buffer) > 0:
                self.train_model()

            champion_state = new_champion_state
            competitor_state = self.game.return_competitor_state()
            if done:
                self.current_score = 0
                print(self.epsilon)
                if self.display_reward:
                    print(self.total_reward)
                break

    def test_game(self):
        self.game.reset_game()

        champion_state = self.game.return_champion_state()
        competitor_state = self.game.return_competitor_state()

        while True:
            champion_action = self.champion_action(champion_state, display=True)
            competitor_action = self.competitor_action(competitor_state)
            self.game.step(competitor_action, champion_action)

            champion_state = self.game.return_champion_state()
            competitor_state = self.game.return_competitor_state()

            done = self.game.game_over
            if done:
                self.current_score = 0
                return champion_state['score']

    def champion_action(self, state, display=False):
        if random.random() < self.epsilon:
            return random.choice(self.game.POSSIBLE_MOVES)
        else:
            state_values = np.array([[value for value in state.values()]])
            state_values_0 = [value for value in state.values()]
            return np.argmax(self.champion.batch_prediction(state_values, display)) - 1

    def competitor_action(self, state):
        state_values = np.array([[value for value in state.values()]])
        return np.argmax(self.competitor.batch_prediction(state_values)) - 1

    def calculate_reward(self, state):
        output = 0
        if state['score'] > self.current_score:
            print('GOAL!')
            self.current_score = state['score']
            if self.game.last_hit:
                print('Down the Line! (winner)')
                output += (5 * self.winners_parameter)
                self.winners_parameter *= self.winners_growth
        elif state['score'] < self.current_score:
            print('CONCEDED!')
            self.current_score = state['score']
            output += -5
        if state['champion-paddle-y'] <= state['ball-position-y'] <= state['champion-paddle-y'] + 0.1:
            output += 0.1
        if self.game.collision:
            output += (5 * self.returns_parameter)
            self.returns_parameter *= self.returns_decay
        if output:
            print('Champion rewarded: ' + str(output))
        return output

    def add_sample(self, champion_state, new_champion_state, reward, action, done):
        champion_state = [component for component in champion_state.values()]
        new_champion_state = [component for component in new_champion_state.values()]
        if done:
            self.memory.add_memory((champion_state, None, reward, action))
        else:
            self.memory.add_memory((champion_state, new_champion_state, reward, action))

    def update_epsilon(self):
        self.epsilon = self.min_epsilon + ((self.max_epsilon - self.min_epsilon) * math.exp(-self.epsilon_decay * self.total_steps))

    def train_model(self):
        batch = self.memory.sample_memory(self.batch_size)
        # print('batch')
        # print(batch)
        states = np.array([entry[0] for entry in batch])
        # print("\nstates")
        # print(states)
        new_states = [entry[1] for entry in batch]
        new_states = [[None] * self.champion.no_inputs if v is None else v for v in new_states]
        new_states = np.array(new_states)
        # print("\nnew states")
        # print(new_states)

        reward_predictions, next_reward_predictions = self.reward_predictions(states, new_states)

        # print("\n reward predictions")
        # print(reward_predictions)
        # print("\n next reward predictions")
        # print(next_reward_predictions)
        champion_input_array = np.zeros([min(self.batch_size, len(batch)), self.champion.no_inputs])
        champion_output_array = np.zeros([min(self.batch_size, len(batch)), self.champion.no_actions])

        for index, element in enumerate(batch):
            state, new_state, reward, action = element[0], element[1], element[2], element[3]
            current_reward = reward_predictions[index]

            if new_state:
                current_reward[action] = reward + self.gamma * np.amax(next_reward_predictions[index])
            else:
                current_reward[action] = reward

            champion_input_array[index] = state
            champion_output_array[index] = current_reward

        # print("\n input array")
        # print(champion_input_array)
        # print("\n output array")
        # print(champion_output_array)
        self.champion.batch_train(champion_input_array, champion_output_array)

    def reward_predictions(self, states, new_states):
        return [
          self.champion.batch_prediction(states),
          self.champion.batch_prediction(new_states)
        ]
