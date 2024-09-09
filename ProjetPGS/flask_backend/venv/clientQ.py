from flask import Flask, jsonify
import pandas as pd
import psycopg2
from sklearn.cluster import KMeans
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Database connection parameters
hostname = 'localhost'
database = 'base_finale_pi'
username = 'postgres'
password = '13012523'
port_id = 5432

@app.route('/clientQ')
def get_data():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host=hostname,
            dbname=database,
            user=username,
            password=password,
            port=port_id
        )

        # Queries to fetch data
        query_clients = "SELECT * FROM \"DIM_CLIENTS\";"  
        query_dates = "SELECT * FROM \"dim_date\";"
        query_fact = "SELECT * FROM \"fact_commandes\";"

        df_clients = pd.read_sql_query(query_clients, conn)
        df_dates = pd.read_sql_query(query_dates, conn)
        df_fact = pd.read_sql_query(query_fact, conn)

        # Close the connection
        conn.close()

        # Data processing and KMeans
        df_num_orders = df_fact.groupby('Client_FK').size().reset_index(name='Num_Orders')
        features = pd.merge(df_fact.groupby('Client_FK')['ORDERED_QUANTITY'].sum().reset_index(name='Total_Ordered_Quantity'), df_num_orders, on='Client_FK')

        kmeans = KMeans(n_clusters=3, random_state=42)
        kmeans.fit(features)
        features['Cluster'] = kmeans.labels_

        # Prepare data for JSON response
        results = features.to_dict(orient='records')
        return jsonify(results)

    except psycopg2.Error as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
