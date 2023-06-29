import pickle
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:3000')

# Load the Random Forest model
RF_pkl_filename = './model/NBClassifier.pkl'
with open(RF_pkl_filename, 'rb') as RF_Model_pkl:
    RF_model = pickle.load(RF_Model_pkl)

@app.route('/predictCrop', methods=['POST'])
def postpredict():
    # Get the JSON data from the request
    data = request.json['data']

    # Convert the data to a numpy array
    input_data = np.array(data)

    # Make the prediction
    prediction = RF_model.predict(input_data)

    # Return the prediction as a JSON response
    response = {'prediction': prediction.tolist()}
    return jsonify(response)

if __name__ == '__main__':
    # Run the Flask application
    app.run(host='localhost', port=8000, debug=True)