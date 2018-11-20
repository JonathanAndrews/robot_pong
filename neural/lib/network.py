import keras
import tensorflowjs as tfjs
from keras.models import Sequential, load_model
from keras.layers import Dense, InputLayer, Dropout
from keras.optimizers import Adam



class Network:
    '''The neural network. There are no ifs no buts just a neural network'''

    def __init__(self, no_actions, no_inputs, hidden_layer_size=100, no_hidden_layers=3,
                 learning_rate=0.001, keep_prob=0.5, activation_function='tanh',
                 loss_function='mse', maximum_saves=10000):
        self.no_actions = no_actions
        self.no_inputs = no_inputs
        self.hidden_layer_size = hidden_layer_size
        self.no_hidden_layers = no_hidden_layers
        self.learning_rate = learning_rate
        self.keep_prob = keep_prob
        self.activation_function = activation_function
        self.loss_function = loss_function
        self.maximum_saves = maximum_saves

        self.define_model()

    def define_model(self):
        self.model = Sequential()
        self.model.add(Dense(self.hidden_layer_size, activation=self.activation_function, input_shape=(self.no_inputs,)))
        self.model.add(Dropout(1 - self.keep_prob))
        for i in range(self.no_hidden_layers - 1):
            self.model.add(Dense(self.hidden_layer_size, activation=self.activation_function))
            self.model.add(Dropout(1 - self.keep_prob))
        self.model.add(Dense(self.no_actions, activation='linear'))
        optimizer = Adam(lr=self.learning_rate)
        self.model.compile(loss=self.loss_function, optimizer=optimizer)

    def single_prediction(self, inputs):
        return self.model.predict(inputs, verbose=0)

    def batch_prediction(self, inputs):
        return self.model.predict(inputs, verbose=0)

    def batch_train(self, inputs, outputs):
        self.model.fit(inputs, outputs, verbose=0)

    def load_network(self, filename):
        self.model = load_model(filename + '.h5')

    def save_network(self, filename):
        self.model.save(filename + '.h5')
        tfjs.converters.save_keras_model(self.model, filename + '/javascript/')
