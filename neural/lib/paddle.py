import numpy as np

class Paddle:
    def __init__(self, position, player, thickness, indent=10, speed=6,
                 length=100, canvas_width=900, canvas_height=600):
        self.position = np.array([player * (canvas_width - thickness - 2 * indent) + indent,
                                  position])
        self.thickness = thickness
        self.length = length
        self.canvas = np.array([canvas_width, canvas_height])
        self.speed = speed
        self.velocity = np.array([0, 0])

    def step(self, action=0):
        self.velocity = self.speed * np.array([0, action])
        self.position += self.velocity
        self.check_boundaries()

    def check_boundaries(self):
        self.position[1] = max(0, min(self.position[1],
                                      self.canvas[1] - self.length))
