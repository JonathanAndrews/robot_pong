import tensorflow as tf

class Network:
    '''The neural network. There are no ifs no buts just a neural network'''

    def __init__(self, no_actions, no_inputs, hidden_layer_size=100, no_hidden_layers=3, keep_prob=0.9, activation_function=tf.nn.tanh):
        self.no_actions = no_actions
        self.no_inputs = no_inputs
        self.hidden_layer_size = hidden_layer_size
        self.no_hidden_layers = no_hidden_layers
        self.keep_prob = keep_prob
        self.activation_function = activation_function

        self.define_model()

    def define_model(self):
        self.define_placeholders()
        self.define_variables()

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
        layers[0] = tf.nn.dropout(self.activation_function(tf.matmul(self.states, first_weights) + first_biases), self.dropout)
        for i in range(self.no_hidden_layers - 1):
            layers[i + 1] = tf.nn.dropout(self.activation_function(tf.matmul(layers[i], hidden_weights[i]) + hidden_biases[i]), self.dropout)

        self.neural_output = tf.matmul(layers[self.no_hidden_layers - 1], last_weights) + last_biases

        self.saver = tf.train.Saver([first_weights, first_biases, last_weights, last_biases] +
                                    [hidden_weight for hidden_weight in hidden_weights.values()] +
                                    [hidden_bias for hidden_bias in hidden_biases.values()])
        self.loss = tf.losses.mean_squared_error(self.neural_output, self.q_values)
        self.optimizer = tf.train.AdamOptimizer(learning_rate=0.001).minimize(self.loss)
        self.variable_initializer = tf.global_variables_initializer()

    def single_prediction(self, inputs, session):
        return session.run(self.neural_output, feed_dict={
            self.states: inputs.reshape(1, self.no_inputs),
            self.dropout: 1.0
        })

    def batch_prediction(self, inputs, session):
        return session.run(self.neural_output, feed_dict={
            self.states: inputs,
            self.dropout: self.keep_prob
        })

    def batch_train(self, inputs, outputs, session):
        return session.run(self.optimizer, feed_dict={
            self.states: inputs,
            self.q_values: outputs,
            self.dropout: self.keep_prob
        })

    def load_network(self, session, filename):
        pass

    def save_network(self, session, filename):
        save_path = self.saver.save(session, filename)
        print("Model saved in path: %s" % save_path)
