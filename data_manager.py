from psycopg2 import sql

import persistence
import logic

@persistence.connection_handler
def insert_new_user(cursor, username, password):
    cursor.execute(
        sql.SQL("""
                    INSERT INTO users (username, password)
                    VALUES (%(username)s, %(password)s);
                """), {'username': username, 'password': password}
                )


@persistence.connection_handler
def check_if_user_in_databse(cursor, username):
    cursor.execute(
        sql.SQL("""
                    SELECT username FROM users
                    WHERE username = %(username)s;
                """), {'username': username}
                )
    username = cursor.fetchall()
    return username

@persistence.connection_handler
def get_user_password(cursor, username):
    cursor.execute(
        sql.SQL("""
                    SELECT password FROM users
                    WHERE username = %(username)s;
                """), {'username': username}
                )
    password = cursor.fetchall()
    return password

@persistence.connection_handler
def get_user_id(cursor):
    cursor.execute(
        sql.SQL("""
                    SELECT id FROM users
                    WHERE username = %(username)s
                """), {'username': logic.active_user}
                )
    user_id = cursor.fetchall()
    return user_id[0]['id']

@persistence.connection_handler
def save_vote(cursor, planet_name, planet_id, submission_time, user_id):

    cursor.execute(
        sql.SQL("""
                    INSERT INTO planetvotes (planet_id, planet_name, user_id, submission_time)
                    VALUES (%(planet_id)s, %(planet_name)s, %(user_id)s, %(submission_time)s);
                """), {'planet_id': planet_id, 'planet_name': planet_name, 'user_id': user_id , 'submission_time' : submission_time}
                )

@persistence.connection_handler
def get_voted_planets(cursor):
    cursor.execute(
        sql.SQL("""
                    SELECT planet_name FROM planetvotes
                    JOIN users ON users.id = planetvotes.user_id
                    WHERE username = %(username)s;
                """), {'username': logic.active_user}
                )
    voted_planets_dicts = cursor.fetchall()
    return voted_planets_dicts