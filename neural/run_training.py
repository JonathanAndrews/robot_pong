import math
import tensorflow as tf
import numpy as np
import time
from lib.network import Network
from lib.game import Game
from lib.memory import Memory
from lib.trainer import Trainer

HIDDEN_LAYER_SIZE = 100
NO_HIDDEN_LAYERS = 3
GAME_LENGTH = 120000
GAME_STEP_TIME = 20
GAMES_PER_TRAINING_SESSION = 1
NUMBER_OF_TRAINING_SESSIONS = 10
MEMORY_SIZE = 60000
MAX_EPSILON = 0.999
MIN_EPSILON = 0.001
EPSILON_DECAY = 0.0001
GAMMA = 0.999

def main():
    champion_graph = tf.Graph()
    competitor_graph = tf.Graph()
    champion_session = tf.Session(graph=champion_graph)
    competitor_session = tf.Session(graph=competitor_graph)

    memory_bank = Memory(MEMORY_SIZE)
    pong_game = Game(GAME_LENGTH, GAME_STEP_TIME)

    with champion_graph.as_default():
        champion = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS)
        champion_session.run(champion.variable_initializer)
    with competitor_graph.as_default():
        competitor = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS)
        competitor_session.run(competitor.variable_initializer)

    trainer = Trainer(pong_game, champion_session, competitor_session, champion_graph, competitor_graph, memory_bank, champion, competitor, MAX_EPSILON, MIN_EPSILON, EPSILON_DECAY, GAMMA)


    for version in range(NUMBER_OF_TRAINING_SESSIONS):

        start_time = time.time()
        for _ in range(GAMES_PER_TRAINING_SESSION):
            trainer.run_game()
            print('Finished a game')

        print("Time taken: %s", time.time() - start_time)
        champion.save_network(champion_session, './trained_networks/version_' + str(version) + '/')

        #run test_match
        #pick winner
        #pick new competitor
        #trainer = Trainer(champion, competitor)

if __name__ == '__main__':
    print('Calling main function')
    main()
