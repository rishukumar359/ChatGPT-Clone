from flask import Flask, request, jsonify
import openai
import json
from flask_cors import CORS

app = Flask("rishu")
CORS(app)

@app.route("/gpt_response", methods=["POST", "GET"])
def home():
    # OpenAI API Key
    openai.api_key = "your"

    # Check if it's a POST request and get the request body
    if request.method == "POST":
        try: 
            print(request.get_json())
            # Decode the incoming request data assuming it's in JSON format
            data = request.get_json()
            
            # Assuming you want to send the 'content' field to the OpenAI API
            if not data or 'content' not in data:
                return jsonify({"error": "No content provided"}), 400

            NameOfFile = data['content']  # Directly use the 'content'

            # Make a request to the OpenAI ChatCompletion API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": NameOfFile},
                ]
            )

            # Extracting the response from OpenAI
            answer_from_chatgpt = response["choices"][0]["message"]["content"]

            # Return the response from the OpenAI API as JSON
            return jsonify({"response": answer_from_chatgpt})

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Default response for non-POST requests
    return jsonify({"message": "Welcome to the API!"})

# Run the Flask app in debug mode
if __name__ == "__main__":
    app.run(debug=True)
