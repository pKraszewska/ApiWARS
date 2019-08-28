from flask import Flask, render_template, request, json, session
import json
import logic

app = Flask(__name__)
app.secret_key = 'api'


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        if 'username' in session:
            logic.active_user = session['username']
            return json.dumps(session['username'])
        return json.dumps(False)
    return render_template('index.html')


@app.route("/register", methods=['GET', 'POST'])
def register_new_user():
    register_input = request.get_json()
    if logic.check_if_user_in_database(register_input) == True:
        return json.dumps(False)
    logic.register_new_user(register_input)
    return json.dumps(True)


@app.route("/login", methods=['GET', 'POST'])
def login():
    login_input = request.get_json()

    if logic.check_if_user_in_database(login_input) and logic.check_if_user_password_correct(login_input):
        username = login_input['username']
        logic.active_user = username
        session['username'] = username
        return json.dumps(username)
    return json.dumps(False)


@app.route("/logout", methods=['GET', 'POST'])
def logout_user():
    session.pop('username', None)
    logic.active_user = ""
    return json.dumps(True)


@app.route("/vote", methods=['GET', 'POST'])
def vote():
    vote_input = request.get_json()
    logic.vote(vote_input)
    return json.dumps(True)


@app.route("/voted_planets", methods=['GET', 'POST'])
def get_voted_planets():
    voted_planets = logic.get_voted_planets()

    return json.dumps(voted_planets)


if __name__ == '__main__':
    app.run(debug=True,
            port=5000)