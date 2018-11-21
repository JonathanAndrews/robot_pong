import numpy as np
from lib.ball import *
from lib.paddle import *

class Game:
    POSSIBLE_MOVES = [-1, 0, 1]

    def __init__(self, total_game_time, refresh_time, canvas_width=900,
                 canvas_height=600, paddle_type=Paddle, ball_type=Ball):
        self.canvas = np.array([canvas_width, canvas_height])
        self.left_paddle = paddle_type(290, 0, 10)
        self.right_paddle = paddle_type(290, 1, 10)
        self.ball = ball_type(450, 300, 8, 8)
        self.time_remaining = total_game_time
        self.refresh_time = refresh_time
        self.score = np.array([0, 0])
        self.game_over = False
        self.collision = False
        self.initial_values = [total_game_time, refresh_time]
        self.current_hit = None
        self.last_hit = None

    def step(self, left_action=0, right_action=0):
        self.step_components(left_action, right_action)
        self.check_ball_paddle_collision()
        if self.check_for_goals():
            print('Ball is at ' + str(self.ball.position[1]) + ', champion paddle is at ' + str(self.right_paddle.position[1]))
            print(self.return_champion_state())
            self.last_hit = self.current_hit
            self.current_hit = None
            # self.reset_ball_position()
        self.update_ball_scored_goal()
        self.time_remaining -= self.refresh_time
        self.is_game_over()

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
            print('COLLISION!')
            self.collision = True
            self.last_hit = self.current_hit
            self.current_hit = 0
            self.ball.velocity[0] *= -1
            where_on_paddle = ((self.left_paddle.position[1] - self.ball.position[1])/ self.left_paddle.length)
            self.update_ball_velocity(where_on_paddle)
        else:
            self.collision = False


    def check_ball_right_paddle_collision(self):
        if ((self.ball.position[0] + self.ball.radius >= self.right_paddle.position[0])
           and (self.right_paddle.position[1] <= self.ball.position[1] <= self.right_paddle.position[1] + self.right_paddle.length)
           and (self.ball.velocity[0] >= 0)):
            print('COLLISION!')
            self.collision = True
            self.last_hit = self.current_hit
            self.current_hit = 1
            self.ball.velocity[0] *= -1
            where_on_paddle = (( self.right_paddle.position[1] - self.ball.position[1])/ self.right_paddle.length)
            self.update_ball_velocity(where_on_paddle)
        else:
            self.collision = False

    def update_ball_velocity(self, where_on_paddle):
        self.ball.velocity[1] = -18 * ( 0.5 + where_on_paddle)
    #
    # def reset_ball_position(self):
    #     self.ball.reset_position()
    #     self.ball.velocity[0] *= -1

    def check_for_goals(self):
        if self.ball.scored_goal == False:
            self.score += np.array(self.ball.check_for_goals())
            return sum(self.ball.check_for_goals())
        return False

    def is_game_over(self):
        if self.time_remaining <= 0:
            self.game_over = True

    def update_ball_scored_goal(self):
        self.ball.update_scored_goal()

    def return_champion_state(self):
        ai_inputs = {
            'champion-paddle-y': self.right_paddle.position[1] / self.canvas[1],
            # 'champion-paddle-dy': self.right_paddle.velocity[1] / self.right_paddle.speed,
            # 'competitor-paddle-y': self.left_paddle.position[1] / self.canvas[1],
            # 'competitor-paddle-dy': self.left_paddle.velocity[1] / self.left_paddle.speed,
            'ball-position-x': self.ball.position[0] / self.canvas[0],
            'ball-position-y': self.ball.position[1] / self.canvas[1],
            'ball-velocity-dx': self.ball.velocity[0] / abs(self.ball.velocity[0]),
            'ball-velocity-dy': self.ball.velocity[1] / abs(self.ball.velocity[0]),
            # 'time-remaining': self.time_remaining / self.initial_values[0],
            'score': (self.score[1] - self.score[0]) / 100
        }
        return ai_inputs

    def return_competitor_state(self):
        ai_inputs = {
            'champion-paddle-y': self.left_paddle.position[1] / self.canvas[1],
            # 'champion-paddle-dy': self.left_paddle.velocity[1] / self.left_paddle.speed,
            # 'competitor-paddle-y': self.right_paddle.position[1] / self.canvas[1],
            # 'competitor-paddle-dy': self.right_paddle.velocity[1] / self.right_paddle.speed,
            'ball-position-x': (self.canvas[0] - self.ball.position[0]) / self.canvas[0],
            'ball-position-y': self.ball.position[1] / self.canvas[1],
            'ball-velocity-dx': -self.ball.velocity[0] / abs(self.ball.velocity[0]),
            'ball-velocity-dy': self.ball.velocity[1] / abs(self.ball.velocity[0]),
            # 'time-remaining': self.time_remaining / self.initial_values[0],
            'score': (self.score[0] - self.score[1]) / 100
        }
        return ai_inputs

    def reset_game(self):
        self.time_remaining, self.refresh_time = self.initial_values
        self.game_over = False
        self.score = np.array([0, 0])
        self.ball.position = self.canvas / 2
