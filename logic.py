import server
import data_manager

from datetime import datetime

active_user = ''

def register_new_user(register_input):
    username = register_input['username']
    password = register_input['password']
    data_manager.insert_new_user(username, password)

def check_if_user_in_database(user_input):
    username = user_input['username']
    result = data_manager.check_if_user_in_databse(username)
    if result == []:
        return False
    else:
        return True

def check_if_user_password_correct(user_input):
    username = user_input['username']
    password = user_input['password']
    password_from_database = data_manager.get_user_password(username)
    if password_from_database != []:
        if password == password_from_database[0]['password']:
            return True
    return False

def vote(vote_input):
    planet_name = vote_input['planet_name']
    planet_id = vote_input['planet_id']
    user_id = data_manager.get_user_id()
    submission_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data_manager.save_vote(planet_name, planet_id, submission_time, user_id)

def get_voted_planets():
    voted_planets_dicts = data_manager.get_voted_planets()
    voted_planets = []
    for item in voted_planets_dicts:
        voted_planets.append(item['planet_name'])
    return voted_planets