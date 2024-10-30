import google.generativeai as genai

from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import json
import ast



# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
API_KEY = 'AIzaSyAS2zdHz91sTTdLtLdkjhU8q_Eh2GWcIR8'
genai.configure(api_key=API_KEY)
# model_gemini = genai.GenerativeModel('gemini-pro')
model_gemini = genai.GenerativeModel('gemini-pro')
# Access the variables

import ast

def string_to_dict(string):
    # Convert the string to a dictionary
    try:
        return ast.literal_eval(string)
    except (SyntaxError, ValueError) as e:
        print(f"Error converting string to dictionary: {e}")
        return None

def cal_response_gemini(prompt):
    print(22,prompt)
    prompt_temp = f"""Please provide the response for {prompt}
      Your response should conform to this JSON format:

Input:
{{
    "input": "what is HTML?"
}}

Output:
{{
   "output":"Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web applications."
}}.
Output:"""
    response = model_gemini.generate_content(prompt)
    print(response)
    generated_response = response.text
    print(generated_response)
    print(string_to_dict(generated_response))

    return jsonify(generated_response )

@app.route('/res_cal', methods=['POST'])
def next_question():
    data = request.json 
    print(data)
    query = data.get('query')
    res=cal_response_gemini(query)
    print(res,type(res))
    return res

if __name__ == "__main__": 
    app.run(host="0.0.0.0", debug=True) 
       