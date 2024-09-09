import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EmissionService } from 'src/app/service/emmission.service';

@Component({
  selector: 'app-emission',
  templateUrl: './emission.component.html',
  styleUrls: ['./emission.component.css']
})
export class EmissionComponent implements OnInit {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private emissionService: EmissionService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.emissionService.getEmissionData().subscribe({
      next: (data) => {
        this.createChart(data.dates, data.predictions);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  // Fonction pour déterminer la couleur de chaque point en fonction de sa date
  getPointColor(date: string): string {
    // Extraire l'année de la date
    const year = new Date(date).getFullYear();
    // Comparer l'année avec 2023
    if (year === 2023) {
      // Si l'année est 2023, retourner 'green' pour la couleur verte
      return 'green';
    } else {
      // Sinon, retourner 'blue' pour la couleur bleue
      return 'blue';
    }
  }

  createChart(dates: string[], predictions: number[]): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Emission Predictions',
          data: predictions,
          borderColor: 'rgba(0, 0, 0, 0)', // Définir la couleur de la bordure des points comme transparente
          backgroundColor: dates.map(date => this.getPointColor(date)), // Appeler la fonction getPointColor pour chaque date
          pointRadius: 5 // Ajustez la taille des points ici pour plus d'espacement
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              minRotation: 45, // Rotation minimale
              maxRotation: 45 // Rotation maximale
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10 // Définissez l'intervalle entre les graduations de l'axe y ici
            }
          }
        }
      }
    });
  }
}
