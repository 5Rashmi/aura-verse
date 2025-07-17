from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

# Load model and vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

#Initialize flask app
app = Flask(__name__)

#cors
CORS(app)

# Home route
@app.route("/")
def home():
    return "Mood detection API is running!"

# Predict route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    vector = vectorizer.transform([text])
    prediction = model.predict(vector)[0]

    return jsonify({"mood": prediction})

# Run the app
if __name__== "__main__":
    app.run(host="0.0.0.0", port=10000)