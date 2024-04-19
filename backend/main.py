import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def create_submission(code, language_id):
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    headers = {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
    }
    payload = {
        "source_code": code,
        "language_id": language_id
    }
    response = requests.post(url, json=payload, headers=headers)
    print("Create Submission Response:", response.json())  # Added logging
    return response.json()

def get_submission_result(token):
    url = f"https://judge0-ce.p.rapidapi.com/submissions/{token}"
    headers = {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers)
    print("Get Submission Result Response:", response.json())  # Added logging
    return response.json()

@app.route("/", methods=['POST'])
def run_code():
    data = request.json
    print("Received Request Data:", data)  # Added logging
    code = data.get("code")
    language_id = data.get("language_id")
    print("code")

    if not code or not language_id:
        return jsonify({"error": "Missing code or language_id parameter"}), 400

    submission_response = create_submission(code, language_id)
    token = submission_response.get('token')

    if token:
        submission_result = get_submission_result(token)
        # Check if the submission is finished
        while submission_result["status"]["description"] != "Accepted":
            submission_result = get_submission_result(token)
        return jsonify(submission_result)
    else:
        return jsonify({"error": "Submission failed"}), 400

if __name__ == "__main__":
    app.run(debug=True, port=8080)
