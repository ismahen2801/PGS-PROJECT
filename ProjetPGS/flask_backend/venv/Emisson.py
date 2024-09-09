from flask import Flask, jsonify, request
import psycopg2
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.impute import SimpleImputer
import json
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database parameters
hostname = 'localhost'
database = 'BI'
username = 'postgres'
password = '13012523'
port_id = 5432

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Connect to the database
        conn = psycopg2.connect(host=hostname, dbname=database, user=username, password=password, port=port_id)

        # SQL Query
        query = """
        SELECT dd."full_date", SUM(fc."GROSS_TOTALIZER") AS gross_totalizer, SUM(fc."NET_TOTALIZER") AS net_totalizer,
               AVG(fc."TEMPERATURE") AS temperature
        FROM "FAACCT_TTRANSPORT_time" AS fc
        INNER JOIN "DIM_DATE" AS dd ON fc."date_Fk" = dd."date_pk"
        GROUP BY dd."full_date"
        ORDER BY dd."full_date";
        """

        # Execute query and close connection
        df = pd.read_sql_query(query, conn)
        conn.close()

        # Data processing
        df['difference'] = (df['gross_totalizer'] - df['net_totalizer']) * 2.45
        df['full_date'] = pd.to_datetime(df['full_date'])
        df['days_since_epoch'] = (df['full_date'] - pd.Timestamp("1970-01-01")).dt.days

        X = df[['days_since_epoch', 'temperature']]
        y = df['difference']

        # Handle missing values
        imputer = SimpleImputer(strategy='mean')
        X_imputed = imputer.fit_transform(X)

        # Model training
        model = LinearRegression()
        model.fit(X_imputed, y)

        # Prediction for the next two years
        last_date = df['full_date'].max()
        new_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=730, freq='D')
        new_days_since_epoch = (new_dates - pd.Timestamp("1970-01-01")).days.values.reshape(-1, 1)
        new_temperatures = np.full((730, 1), np.mean(df['temperature']))
        new_X = np.hstack((new_days_since_epoch, new_temperatures))

        new_y_pred = model.predict(new_X)

        # Prepare the response data
        response_data = {
            "dates": new_dates.strftime('%Y-%m-%d').tolist(),
            "predictions": new_y_pred.tolist()
        }

        return jsonify(response_data)

    except psycopg2.DatabaseError as error:
        return jsonify({"error": f"Database error: {error}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
