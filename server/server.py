from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/hello')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run(host='127.0.0.1', port=5001, debug=True)

