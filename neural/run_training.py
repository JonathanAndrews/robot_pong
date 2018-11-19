import datetime
import math
import numpy as np
import os
import pandas as pd
import pickle
import random
import time
from lib.network import Network
from lib.game import Game
from lib.memory import Memory
from lib.trainer import Trainer

HIDDEN_LAYER_SIZE = 100
NO_HIDDEN_LAYERS = 4
GAME_LENGTH = 120000
GAME_STEP_TIME = 20
GAMES_PER_TRAINING_SESSION = 1
NUMBER_OF_TRAINING_SESSIONS = 50
MEMORY_SIZE = 60000
MAX_EPSILON = 0.9999
MIN_EPSILON = 0.01
EPSILON_DECAY = 0.001
GAMMA = 0.95
RETURNS_DECAY = 0.95
WINNERS_GROWTH = 1.15
BATCH_SIZE = 64
LEARNING_RATE = 0.1
STARTING_VERSION = 0
DATETIME = datetime.datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
DESCRIPTION = 'Raised learning rate, 2 games per training session'
DIRECTORY = './trained_networks/' + DATETIME

HYPERPARAMETER_DICT = {
    'HIDDEN_LAYER_SIZE': HIDDEN_LAYER_SIZE,
    'NO_HIDDEN_LAYERS': NO_HIDDEN_LAYERS,
    'GAME_LENGTH': GAME_LENGTH,
    'GAME_STEP_TIME': GAME_STEP_TIME,
    'GAMES_PER_TRAINING_SESSION': GAMES_PER_TRAINING_SESSION,
    'NUMBER_OF_TRAINING_SESSIONS': NUMBER_OF_TRAINING_SESSIONS,
    'MEMORY_SIZE': MEMORY_SIZE,
    'MAX_EPSILON': MAX_EPSILON,
    'MIN_EPSILON': MIN_EPSILON,
    'EPSILON_DECAY': EPSILON_DECAY,
    'GAMMA': GAMMA,
    'RETURNS_DECAY': RETURNS_DECAY,
    'WINNERS_GROWTH': WINNERS_GROWTH,
    'BATCH_SIZE': BATCH_SIZE,
    'LEARNING_RATE': LEARNING_RATE,
    'STARTING_VERSION': STARTING_VERSION,
    'DATETIME': DATETIME,
    'DESCRIPTION': DESCRIPTION,
    'DIRECTORY': DIRECTORY
}


def main():
    memory_bank = Memory(MEMORY_SIZE)
    pong_game = Game(GAME_LENGTH, GAME_STEP_TIME)

    champion = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS, learning_rate=LEARNING_RATE)
    competitor = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS)

    trainer = Trainer(pong_game, memory_bank, champion, competitor, MAX_EPSILON, MIN_EPSILON, EPSILON_DECAY, GAMMA, RETURNS_DECAY, WINNERS_GROWTH, batch_size=BATCH_SIZE)

    champion.save_network(DIRECTORY + '/version_' + str(STARTING_VERSION))

    for version in range(STARTING_VERSION, STARTING_VERSION + NUMBER_OF_TRAINING_SESSIONS):

        start_time = time.time()
        for _ in range(GAMES_PER_TRAINING_SESSION):
            print('New game')
            trainer.run_game()
            trainer.game = Game(GAME_LENGTH, GAME_STEP_TIME)

        print("Time taken for training session: ", time.time() - start_time)
        champion.save_network(DIRECTORY + '/version_' + str(version + 1))

        trainer.game = Game(GAME_LENGTH, GAME_STEP_TIME)
        test_score = trainer.test_game()

        if test_score < 0:
            print('Competitor wins, score was ' + str(test_score))
            competitor.save_network(DIRECTORY + '/competitor_save')
            champion.load_network(DIRECTORY + '/competitor_save')
        else:
            print('Champion continues, score was ' + str(test_score))

        new_competitor_version = random.randint(max(0, version - 5), version)
        print('New competitor version: ' + str(new_competitor_version))

        competitor.load_network(DIRECTORY + '/version_' + str(new_competitor_version))

        current_epsilon = trainer.epsilon
        current_returns_parameter = trainer.returns_parameter
        current_winners_parameter = trainer.winners_parameter
        trainer = Trainer(Game(GAME_LENGTH, GAME_STEP_TIME), memory_bank, champion, competitor, current_epsilon, MIN_EPSILON, EPSILON_DECAY, GAMMA, RETURNS_DECAY, WINNERS_GROWTH, returns_parameter=current_returns_parameter, winners_parameter=current_winners_parameter, batch_size=BATCH_SIZE)


if __name__ == '__main__':
    print('Creating directory')
    os.mkdir(DIRECTORY)
    print('Pickling hyperparameter dictionary')
    with open(DIRECTORY + '/hyperparameters.pickle', 'wb') as storage:
        pickle.dump(HYPERPARAMETER_DICT, storage, protocol=pickle.HIGHEST_PROTOCOL)
    print('Saving hyperparameter csv')
    hyperparameter_dataframe = pd.DataFrame([HYPERPARAMETER_DICT], index=['Values'])
    hyperparameter_dataframe.index.name = 'Hyperparameter'
    hyperparameter_dataframe.to_csv(DIRECTORY + '/hyperparameters.csv')
    print('Starting training session')
    main()
    print('Training session complete')
