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

@app.route("/all_races_winners")
def show_all_races_winners():
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
    connection = engine.connect()
    all_races_winners = pd.read_sql('select * from all_races_winners',connection)
    return (all_races_winners.to_json(orient="records"))

# NEED TO UNCOMMENT AND ADD JS/HTML PORTION
# @app.route("/state_finals_2018_female")
# def show_state_finals_2018_female():
#     engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/runner_data')
#     connection = engine.connect()
#     state_finals_2018_female = pd.read_sql('select * from state_finals_2018_female',connection)
#     return (state_finals_2018_female.to_json(orient="records"))


    # meet_date = [results_df[2] for result_df in results_df]



    # trace = {
    #     "x": results_df.meet_date,
    #     "y": results_df.race_result,
    #     "type":"line"
    # }
    # print(meet_date.head())
    # return jsonify(results)

# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.type, func.count(Pet.type)).group_by(Pet.type).all()
#     print("results",results)

#     pet_type = [result[0] for result in results]
#     age = [result[1] for result in results]

#     trace = {
#         "x": pet_type,
#         "y": age,
#         "type": "bar"
#     }
#     #return results()
#     return jsonify(trace), jsonify(trace2), 

# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
