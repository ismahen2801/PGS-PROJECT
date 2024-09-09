from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import pandas as pd
import statsmodels.api as sm

app = Flask(__name__)
CORS(app)

# Paramètres de connexion à la base de données
hostname = 'localhost'
database = 'BI'
username = 'postgres'
password = '13012523'
port_id = 5432

def get_data_from_database():
    try:
        # Connexion à la base de données
        conn = psycopg2.connect(
            host=hostname,
            dbname=database,
            user=username,
            password=password,
            port=port_id
        )

        # Requête pour récupérer les données
        query = """
        SELECT dd."full_date", SUM(fc."ORDERED_QUANTITY") AS total_ordered_quantity
        FROM "FACT_COMMANDES" AS fc
        INNER JOIN "DIM_DATE" AS dd ON fc."Date_FK" = dd."date_pk"
        GROUP BY dd."full_date"
        ORDER BY dd."full_date";
        """

        # Exécuter la requête et stocker les résultats dans un DataFrame
        df_ordered_qty = pd.read_sql_query(query, conn)

        # Fermer la connexion
        conn.close()

        # Convertir la colonne full_date en type datetime
        df_ordered_qty['full_date'] = pd.to_datetime(df_ordered_qty['full_date'])
        
        return df_ordered_qty

    except psycopg2.DatabaseError as error:
        raise ValueError(f"Une erreur de base de données est survenue: {error}")
    except Exception as e:
        raise ValueError(f"Une erreur est survenue: {e}")

def clean_data(df):
    # Nettoyer les données en supprimant les valeurs aberrantes en utilisant le 1er et 99e quantiles comme seuils
    q_low = df['total_ordered_quantity'].quantile(0.01)
    q_high = df['total_ordered_quantity'].quantile(0.99)
    
    df['total_ordered_quantity_cleaned'] = df['total_ordered_quantity'].clip(lower=q_low, upper=q_high)

    return df

def fit_arima(df):
    # Ajuster un modèle ARIMA
    p = 1  # Ordre AR
    d = 0  # Ordre de différenciation
    q = 1  # Ordre MA
    model = sm.tsa.ARIMA(df['total_ordered_quantity_cleaned'], order=(p, d, q))
    results = model.fit()

    return results

@app.route('/forecast', methods=['GET'])
def forecast():
    try:
        # Obtenir les données de la base de données
        df = get_data_from_database()

        # Nettoyer les données
        df = clean_data(df)

        # Ajuster un modèle ARIMA
        results = fit_arima(df)

        # Obtenir les prévisions pour l'année suivante
        forecast = results.forecast(steps=12)  # Prévisions pour 12 mois

        # Ajouter les prévisions à la série de données existante
        future_dates = pd.date_range(df['full_date'].iloc[-1], periods=13, freq='M')[1:]  # Dates pour l'année suivante
        future_dates_str = future_dates.strftime('%Y-%m-%d').tolist()
        future_forecast = forecast.tolist()

        existing_dates = df['full_date'].dt.strftime('%Y-%m-%d').tolist()
        existing_data = df['total_ordered_quantity_cleaned'].tolist()

        # Formatage de la réponse JSON
        response = {
            'existing_dates': existing_dates,
            'existing_data': existing_data,
            'future_dates': future_dates_str,
            'future_forecast': future_forecast
        }
        return jsonify(response)

    except ValueError as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
