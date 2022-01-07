import json
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import tensorflow as tf
import argparse

parser = argparse.ArgumentParser(description='Prediction')
parser.add_argument('--target', type=str, default='./src/data.json', help='data json')

args = parser.parse_args()

with open(args.target, encoding="UTF8") as dataset_full:
  dataset = json.load(dataset_full)

xs = tf.zeros([0, 2, 5000], dtype=tf.dtypes.int32)

for data in dataset["xs"]:
  padded_notes = tf.pad(tf.constant(data[0]), [[0, 5000 - len(data[0])]])
  padded_times = tf.pad(tf.constant(data[1]), [[0, 5000 - len(data[1])]])
  xs = tf.concat([xs, [[padded_notes, padded_times]]], 0)

names = dataset["names"]

model = tf.keras.models.load_model("./src/model")

for i in range(xs.shape[0]):
  print(model.predict(xs[i:i+1])[0][0])
  print(names[i])
