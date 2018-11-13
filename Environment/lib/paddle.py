import numpy as np


class Paddle:
    def __init__(self, position, player, thickness, speed=1,
                 length=20, canvas_width=900, canvas_height=600):
        self.position = np.array([player * (canvas_width - thickness),
                                  position])
        self.thickness = thickness
        self.length = length
        self.canvas = np.array([canvas_width, canvas_height])
        self.speed = speed

    def step(self, action=0):
        self.velocity = self.speed * np.array([0, action])
        self.position += self.velocity
        self.check_boundaries()

    def check_boundaries(self):
        self.position[1] = max(0, min(self.position[1],
                                      self.canvas[1] - self.length))
