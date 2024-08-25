from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'GET':
        # Return a fixed operation code
        return jsonify({"operation_code": 1}), 200

    elif request.method == 'POST':
        # Get JSON data from the request
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_lowercase = sorted([char for char in data if char.islower()])[-1:] if any(char.islower() for char in data) else []

        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",  # Replace with actual logic to generate user_id
            "email": "john@xyz.com",          # Replace with actual email extraction logic
            "roll_number": "ABCD123",         # Replace with actual roll number extraction logic
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase
        }
        return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
