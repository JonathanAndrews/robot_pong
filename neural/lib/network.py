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

        self.define_model()

    def define_model(self):
        self.define_placeholders()
        self.define_variables()
        self.define_utilities()

    def define_placeholders(self):
        self.states = tf.placeholder(shape=[None, self.no_inputs],
                                     dtype=tf.float32)
        self.q_values = tf.placeholder(shape=[None, self.no_actions],
                                    dtype=tf.float32)
        self.dropout = tf.placeholder(dtype=tf.float32)

    def define_variables(self):
        first_weights = tf.Variable(tf.truncated_normal([self.no_inputs, self.hidden_layer_size]))
        first_biases = tf.Variable(tf.zeros([self.hidden_layer_size]))
        last_weights = tf.Variable(tf.truncated_normal([self.hidden_layer_size, self.no_actions]))
        last_biases  = tf.Variable(tf.zeros([self.no_actions]))

        hidden_weights = {}
        hidden_biases = {}
        for i in range(self.no_hidden_layers - 1):
            hidden_weights[i] = tf.Variable(tf.truncated_normal([self.hidden_layer_size, self.hidden_layer_size]))
            hidden_biases[i] = tf.Variable(tf.zeros([self.hidden_layer_size]))

        layers = {}
        layers[0] = tf.nn.tanh(tf.matmul(self.states, first_weights) + first_biases)
        for i in range(self.no_hidden_layers - 1):
            layers[i + 1] = tf.nn.tanh(tf.matmul(layers[i], hidden_weights[i]) + hidden_biases[i])

        self.saver = tf.train.Saver([first_weights, first_biases, last_weights, last_biases] +
                                    [hidden_weight for hidden_weight in hidden_weights.values()] +
                                    [hidden_bias for hidden_bias in hidden_biases.values()])
        self.neural_output = tf.matmul(layers[self.no_hidden_layers - 1], last_weights) + last_biases

    def define_utilities(self):
        self.loss = tf.losses.mean_squared_error(self.neural_output, self.q_values)
        self.optimizer = tf.train.AdamOptimizer(learning_rate=0.001).minimize(self.loss)
        self.variable_initializer = tf.global_variables_initializer()
