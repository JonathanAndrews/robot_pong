import * as tf from '@tensorflow/tfjs';
import {loadFrozenModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'https://.../mobilenet/web_model.pb';
const WEIGHTS_URL = 'https://.../mobilenet/weights_manifest.json';

const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
const cat = document.getElementById('cat');
model.execute({input: tf.fromPixels(cat)});
