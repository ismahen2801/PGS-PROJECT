import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
 
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  private apiUrl = 'http://localhost:5000/commande';
  chart!: Chart;
  dates: string[] = [];
  predictions: number[] = [];
 
  constructor(private http: HttpClient) {
    // Enregistrer les échelles de temps avant de créer le graphique
    Chart.register(...registerables);
  }
 
  ngOnInit(): void {
    this.getPredictions();
  }
 
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [{
            label: 'Prédiction ARIMA',
            data: this.predictions,
            borderColor: 'red',
            backgroundColor: 'transparent',
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'ddd, DD MMM YYYY HH:mm:ss [GMT]',
                unit: 'day',
                displayFormats: {
                  day: 'YYYY-MM-DD'
                }
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 1000000,
              ticks: {
                stepSize: 100000
              },
              title: {
                display: true,
                text: 'Quantité commandée'
              }
            }
          }
        }
      });
    } else {
      console.error("Canvas element with ID 'myChart' not found.");
    }
  }
 
  getPredictions(): void {
    this.http.get<{ dates: string[], predictions: number[] }>(this.apiUrl).subscribe(data => {
      // Assigner les données récupérées aux propriétés du composant
      this.dates = data.dates;
      this.predictions = data.predictions;
      // Créer le graphique une fois les données récupérées
      this.createChart();
    }, error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
}
 