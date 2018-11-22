# robot_pong

Robot Face Pong is in two parts. One part is an AI that uses reinforcement learning to play pong, implemented using TensorFlow. The other part is a vanilla JS game of pong on the canvas.

It can be found deployed here: https://robot-face-pong.herokuapp.com/

## Installation

Before being able to use any of the below sections, clone this repo then follow the instructions in each section

### Train your AI



### Play pong

to run the game of pong on your localhost, follow these steps from the root of the repo on the CL:

```
$ npm install
$ npm start
```

Then go on to `http://localhost:3000` in browser.

## Testing

The javascript tests are all written using jest, to see all tests as well as test coverage enter the command `npm test`

All python tests have been written using Unittest, to run the tests enter the following:
```
coverage run --source=lib -m unittest && coverage report
```
