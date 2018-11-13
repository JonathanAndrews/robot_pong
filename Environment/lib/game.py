import numpy as np 
from lib.ball import *
from lib.paddle import * 

class Game:
    def __init__(self, total_game_time, refresh_time, canvas_width=900, canvas_height=600, paddle_type=Paddle, ball_type=Ball):
        self.canvas = np.array([canvas_width, canvas_height])
        self.left_paddle = paddle_type(290, 0, 10)
        self.right_paddle = paddle_type(290, 1, 10)
        self.ball = ball_type(450, 300, 1, 1)
        self.time_remaining = total_game_time
        self.score = np.array([0, 0])
    
    def step(self):
        self.ball.step()
        self.left_paddle.step()
        self.right_paddle.step()
        if self.check_for_goals():
            self.reset_ball_position()
    
    def reset_ball_position(self):
        self.ball.reset_position()
    
    def check_for_goals(self):
        self.score += np.array(self.ball.check_for_goals())
        return sum(self.ball.check_for_goals())
            
            

    