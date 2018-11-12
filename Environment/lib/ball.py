import numpy as np

class Ball:
    def __init__(self, position_x, position_y, velocity_x, velocity_y, radius,
                 canvas_width, canvas_height):
        self.position = np.array([position_x, position_y])
        self.velocity = np.array([velocity_x, velocity_y])
        self.radius = radius
        self.canvas = np.array([canvas_width, canvas_height])

    def step(self):
        self.check_collisions()
        self.position += self.velocity

    def check_collisions(self):
        for i in [0,1]:
            if (self.position[i] + self.radius >= self.canvas[i]) or (
                self.position[i] - self.radius <= 0):
                self.velocity[i] *= -1
