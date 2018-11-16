import numpy as np
from lib.ball import *
from lib.paddle import *

class Game:
    def __init__(self, total_game_time, refresh_time, canvas_width=900,
                 canvas_height=600, paddle_type=Paddle, ball_type=Ball):
        self.canvas = np.array([canvas_width, canvas_height])
        self.left_paddle = paddle_type(290, 0, 10)
        self.right_paddle = paddle_type(290, 1, 10)
        self.ball = ball_type(450, 300, 1, 1)
        self.time_remaining = total_game_time
        self.refresh_time = refresh_time
        self.score = np.array([0, 0])
        self.game_over = False

    def step(self, left_action=0, right_action=0):
        self.is_game_over()
        self.step_components(left_action, right_action)
        if self.check_for_goals():
            self.reset_ball_position()
        self.time_remaining -= 1
        ai_inputs = {
            'user-paddle-y': self.left_paddle.position,
            'user-paddle-dy': self.left_paddle.speed,
            'comp-paddle-y': self.right_paddle.position,
            'comp-paddle-dy': self.right_paddle.speed,
            'ball-position-x': self.ball.position[0],
            'ball-position-y': self.ball.position[1],
            'ball-velocity-dx': self.ball.velocity[0],
            'ball-velocity-dy': self.ball.velocity[1],
            'time-remaining': self.time_remaining,
            'score': self.score[0] - self.score[1]
        }
        return ai_inputs

    def step_components(self, left_action, right_action):
        self.ball.step()
        self.left_paddle.step(left_action)
        self.right_paddle.step(right_action)

    def check_ball_paddle_collision(self):
        self.check_ball_left_paddle_collision()
        self.check_ball_right_paddle_collision()

    def check_ball_left_paddle_collision(self):
        if ((self.ball.position[0] - self.ball.radius <= self.left_paddle.thickness)
           and (self.left_paddle.position[1] <= self.ball.position[1] <= self.left_paddle.position[1] + self.left_paddle.length)
           and (self.ball.velocity[0] <= 0)):
            self.ball.velocity[0] *= -1
            where_on_paddle = ((self.left_paddle.position[1] - self.ball.position[1])/ self.left_paddle.length)
            self.ball.velocity[1] = - 4 * ( 0.5 + where_on_paddle)

    def check_ball_right_paddle_collision(self):
        if ((self.ball.position[0] + self.ball.radius >= self.right_paddle.position[0])
           and (self.right_paddle.position[1] <= self.ball.position[1] <= self.right_paddle.position[1] + self.right_paddle.length)
           and (self.ball.velocity[0] >= 0)):
            self.ball.velocity[0] *= -1
            where_on_paddle = (( self.right_paddle.position[1] - self.ball.position[1])/ self.right_paddle.length)
            self.ball.velocity[1] = - 4 * ( 0.5 + where_on_paddle)

    def reset_ball_position(self):
        self.ball.reset_position()

    def check_for_goals(self):
        self.score += np.array(self.ball.check_for_goals())
        return sum(self.ball.check_for_goals())

    def is_game_over(self):
        if self.time_remaining <= 0:
            self.game_over = True
