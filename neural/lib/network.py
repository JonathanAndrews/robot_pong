import tensorflow as tf

class Network:
    '''The neural network. There are no ifs no buts just a neural network'''

    def __init__(self, no_actions, no_inputs, batch_size, hidden_layer_size=100, no_hidden_layers=3, keep_prob=0.9):
        self.no_actions = no_actions
        self.no_inputs = no_inputs
        self.batch_size = batch_size
        self.hidden_layer_size = hidden_layer_size
        self.no_hidden_layers = no_hidden_layers
        self.keep_prob = keep_prob

        # # Define the placeholders. These will become Tensorflow Placeholders.
        # self.states = None
        # self.actions = None
        # self.q_values = None
        #
        # # The output operations. The predictions is going to be a Tensorflow layer,
        # # the optimizer is going to be AdamOptimizer and variable_initializer is just a
        # # variable which holds the Tensorflow global variable initalizer.
        # self.predictions = None
        # self.optimizer = None
        # self.variable_initializer = None
        #
        # # Saves the neural network
        # self.saver = None

        self.define_model()

    def define_model(self):
        self.define_placeholders()

    def define_placeholders(self):
        self.states = tf.placeholder(shape=[None, self.no_inputs],
                                     dtype=tf.float32)
        self.q_values = tf.placeholder(shape=[None, self.no_actions],
                                    dtype=tf.float32)
        self.dropout = tf.placeholder(dtype=tf.float32)
