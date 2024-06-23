$(document).ready(function() {
    // Listen for user input: Is the Send button clicked with a mouse? Then send the message to the Flask backend via AJAX POST request.
    $('#send-btn').click(function() {
        sendMessage();
    });

    // Listen for user input: Is the enter key pressed? Then send the message to the Flask backend via AJAX POST request.
    $('#user-input').keypress(function(e) {
        if (e.which == 13 && !e.shiftKey) { // Send the form on enter keypress and avoid if shift is pressed
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = $('#user-input').val();
        if (userMessage.trim() === "") {
            return;
        }

        // Update the chatbox with the user message.
        $('#chat-box').append(`<div id="user_message"><strong><i class="bi bi-person"></i> You:</strong> ${userMessage}</div>`);
        $('#chat-box #user_message').css({"color": "limegreen"});
        $.ajax({
            url: '/chatgpt_chatbot',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userMessage }),
            success: function(response) {
                const gptReply = response.reply;
                $('#chat-box').append(`<div id="ai_message"><strong><i class="bi bi-robot"></i> ChatBot:</strong> ${gptReply}</div>`);  // Updates the chatbox ChatGPT's responses dynamically.
                $('#chat-box #ai_message').css({"color": "lightsalmon"});
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            },
            error: function(error) {
                console.log(error);
            }
        });

        $('#user-input').val('').focus();
    }
});