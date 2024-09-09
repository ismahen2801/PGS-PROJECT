from flask import Flask, jsonify
import psycopg2
import pandas as pd
from sklearn.cluster import KMeans
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def run_kmeans():
    conn_params = {
        "host": 'localhost',
        "dbname": 'base_finale_pi',
        "user": 'postgres',
        "password": '13012523',
        "port": 5432
    }
    try:
        conn = psycopg2.connect(**conn_params)
        df_clients = pd.read_sql_query("SELECT * FROM \"DIM_CLIENTS\";", conn)
        df_geo = pd.read_sql_query("SELECT * FROM \"DIM_GEOGRAPHIE\";", conn)
        df_merged = pd.merge(df_clients, df_geo, left_on='Code_client', right_on='Destination_Number', how='inner')
        X = df_merged[['Latitude', 'Longitude']].applymap(lambda x: float(x.replace(',', '.')))
        kmeans = KMeans(n_clusters=6)
        df_merged['Cluster'] = kmeans.fit_predict(X)
        return df_merged[['Code_client', 'Latitude', 'Longitude', 'Nom_du_kiosque', 'Cluster']].to_dict(orient='records')
    except Exception as e:
        return {'error': str(e)}
    finally:
        conn.close()

@app.route('/run_kmeans')
def run_kmeans_route():
    result = run_kmeans()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
