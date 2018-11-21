import numpy as np


class Ball:
    def __init__(self, position_x, position_y, velocity_x, velocity_y, radius=5,
                 canvas_width=900, canvas_height=600):
        self.position = np.array([position_x, position_y])
        self.velocity = np.array([velocity_x, velocity_y])
        self.radius = radius
        self.canvas = np.array([canvas_width, canvas_height])
        self.scored_goal = False
        self.back_wall_bounce = False


    def step(self):
        self.position += self.velocity
        self.check_collisions()

    def check_collisions(self):
        if (self.position[1] + self.radius >= self.canvas[1]) or (
                self.position[1] - self.radius <= 0):
            self.velocity[1] *= -1
        if (self.position[0] + self.radius >= self.canvas[0] + 100) or (
                self.position[0] - self.radius <= -100):
            self.velocity[0] *= -1
            self.back_wall_bounce = True

    def check_for_goals(self):
        if ((self.position[0] + self.radius >= self.canvas[0]) and (self.velocity[0] > 0)):
            self.scored_goal = True
            return [1, 0]
        if ((self.position[0] - self.radius <= 0) and (self.velocity[0] < 0)):
            self.scored_goal = True
            return [0, 1]
        return [0, 0]

    def reset_position(self):
        self.position = (self.canvas/2)

    def update_scored_goal(self):
        if (self.position[0] + self.radius <= self.canvas[0] - 30) and (
                self.position[0] - self.radius >= 30):
            self.scored_goal = False
            self.back_wall_bounce = False
