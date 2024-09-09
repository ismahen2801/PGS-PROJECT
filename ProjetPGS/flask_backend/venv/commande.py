from flask import Flask, jsonify
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import sqlalchemy
 
from flask_cors import CORS
 
 
app = Flask(__name__)
CORS(app)
 
# Connect to the database
engine = sqlalchemy.create_engine('postgresql://postgres:13012523@localhost:5432/base_finale_pi')
 
@app.route('/commande')
def arima_predictions():
    try:
        # Write SQL query to calculate sum of ORDERED_QUANTITY per date
        query = """
        WITH ordered_qty AS (
            SELECT
                dd."full_date",
                SUM(fc."ORDERED_QUANTITY") AS total_ordered_quantity
            FROM
                "fact_commandes" AS fc
                INNER JOIN "dim_date" AS dd ON fc."Date_FK" = dd."date_pk"
            WHERE
                dd."full_date" >= '2022-01-01' AND dd."full_date" <= '2022-12-31' -- Filtrer pour l'année 2022
            GROUP BY
                dd."full_date"
            ORDER BY
                dd."full_date"
        )
        SELECT
            "full_date",
            "total_ordered_quantity"
        FROM
            ordered_qty
        """
 
        # Execute query and store results in a DataFrame
        df_ordered_qty = pd.read_sql_query(query, engine)
 
        # ARIMA model training, forecasting, and plotting code here
        train_size_arima = int(len(df_ordered_qty) * 0.8)
        train_arima, test_arima = df_ordered_qty['total_ordered_quantity'][:train_size_arima], df_ordered_qty['total_ordered_quantity'][train_size_arima:]
        order = (5,1,0)  # Exemple d'ordre (p, d, q) pour ARIMA
        model_arima = ARIMA(train_arima, order=order)
        model_fit_arima = model_arima.fit()
        forecast_arima = model_fit_arima.forecast(steps=len(test_arima))
        test_dates_arima = df_ordered_qty['full_date'].values[train_size_arima:]
 
        # Return the predicted values as JSON
        return jsonify({"dates": test_dates_arima.tolist(), "predictions": forecast_arima.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)})
 
if __name__ == '__main__':
    app.run(debug=True)