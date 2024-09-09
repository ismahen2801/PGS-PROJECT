import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DistanceService } from 'src/app/service/distance.service';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {
  @ViewChild('scatterChart', { static: true }) scatterChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private distanceService: DistanceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.distanceService.getClusterData().subscribe({
      next: (data: any[]) => this.createScatterChart(data),
      error: (error: any) => console.error('Error fetching cluster data:', error)
    });
  }

  createScatterChart(clusterData: any[]): void {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    const dataSets = clusterData.reduce((acc, item) => {
      const clusterIndex = item.Cluster % colors.length;
      acc[clusterIndex] = acc[clusterIndex] || {
        label: `Cluster ${item.Cluster}`,
        data: [],
        backgroundColor: colors[clusterIndex],
        hoverBackgroundColor: colors[clusterIndex]
      };
      acc[clusterIndex].data.push({
        x: item.Longitude,
        y: item.Latitude,
        name: item.Nom_du_kiosque,
        code: item.Code_client  // Ensure you have a 'Name' property in your dataset
      });
      return acc;
    }, {});

    this.chart = new Chart(this.scatterChart.nativeElement, {
      type: 'scatter',
      data: {
        datasets: Object.values(dataSets)
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Longitude'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Latitude'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => `Kiosk: ${context.raw.name}, Code: ${context.raw.code}, Lat: ${context.raw.y}, Long: ${context.raw.x}`
            }
          }
        }
      }
    });
  }
}
