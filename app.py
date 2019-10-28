import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from config import password

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://postgres:{password}@localhost:5432/runner_data'
db = SQLAlchemy(app)

# @app.before_first_request
# def setup():
# Recreate database each time for demo
    # db.drop_all()
    # db.create_all()

# db = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
# connection = db.connect()

# session = Session(db)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

## Tim added all the below code
# inspector = inspect(db.engine)
# print("inspect", inspector)
# table_names = inspector.get_table_names()
# print("tables", table_names)
## Tim added all the above code

# Save references to each table
#Results = Base.classes.mini_results_and_goals
#Log = Base.classes.mini_training_log


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")
    # return("Hello!")


@app.route("/results")
def results():
    """Return a list of sample names."""
    
    # Use Pandas to perform the sql query
    stmt = db.session.query(Results).statement
    results = pd.read_sql_query(stmt, db.session.bind)
    stmt = db.session.query(Log).statement
    log_df = pd.read_sql_query(stmt, db.session.bind)
    print(results.head())
    print(log_df.head())
    # Return a list of the column names (sample names)

    df = pd.DataFrame( [i for i in results] )
    print("df",df)

    # results_df = {}
    # for result in results:
    #     results_df[meet_date] = results[2]
    #     results_df[race_result] = results[6]
    # print(results[meet_date])  
    return jsonify(list(results))

@app.route("/2018_race_results")
def show_all_races_in_2018():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    all_races_in_2018 = pd.read_sql('select * from all_2018_races',connection)
    return (all_races_in_2018.to_json(orient="records"))

@app.route("/state_finals_2018_all")
def show_state_finals_2018_all():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    state_finals_2018_all = pd.read_sql('select * from state_finals_2018_all',connection)
    return (state_finals_2018_all.to_json(orient="records"))

@app.route("/cvc1_meet_all")
def show_cvc1_meet_all():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    cvc1_meet_all = pd.read_sql('select * from cvc1_meet_all',connection)
    return (cvc1_meet_all.to_json(orient="records"))

@app.route("/all_races_winners")
def show_all_races_winners():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    all_races_winners = pd.read_sql('select * from all_races_winners',connection)
    return (all_races_winners.to_json(orient="records"))  

@app.route("/grade_levels_at_state")
def show_grade_levels_at_states():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    grade_levels_at_state = pd.read_sql('select * from grade_levels_at_state',connection)
    return (grade_levels_at_state.to_json(orient="records"))

# @app.route("/time")
# def show_all_races_winners():
#     engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
#     connection = engine.connect()
#     all_races_winners = pd.read_sql('select * from all_races_winners',connection)
#     return (all_races_winners.to_json(orient="records"))  

if __name__ == "__main__":
    app.run(debug=True)
