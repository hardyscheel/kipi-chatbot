from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# OpenAI API key (Your own API key here!)
openai.api_key = 'TYPE IN YOUR OPENAI API KEY HERE!'

conversation_history = []

#######################################
# Site Routes (routes to actual pages)
#######################################

@app.route("/")
def home():
    return render_template("home.html", page='home')

@app.route("/chatgpt_chatbot", methods=['POST', 'GET'])
def chatgpt_chatbot_query_view():
    if request.method == 'POST':
        global conversation_history
        user_message = request.json.get("message")

        conversation_history.append({"role": "user", "content": user_message})
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=conversation_history
        )

        gpt_reply = response.choices[0].message.content
        conversation_history.append({"role": "assistant", "content": gpt_reply})

        return jsonify({"reply": gpt_reply})
    return render_template("chatgpt_chatbot.html", page='chatbot')

################
# Start the app
################

if __name__ == "__main__":
    # Start the Flask development server and run the application
    app.run(debug=False, host='0.0.0.0', port=8002)