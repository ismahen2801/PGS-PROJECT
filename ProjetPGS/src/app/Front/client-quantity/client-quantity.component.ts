import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ClientQuantityService } from 'src/app/service/client-quantity.service';

@Component({
  selector: 'app-client-quantity',
  templateUrl: './client-quantity.component.html',
  styleUrls: ['./client-quantity.component.css']
})
export class ClientQuantityComponent implements OnInit, AfterViewInit {
  @ViewChild('scatterChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  dataReady: boolean = false;
  chartData: any[] = [];

  constructor(private clientQuantityService: ClientQuantityService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.clientQuantityService.getClusterData().subscribe({
      next: (data: any[]) => {
        this.chartData = data;
        this.dataReady = true;
        if (this.chart) {
          this.updateChart();
        }
      },
      error: (error: any) => console.error('Error fetching cluster data:', error)
    });
  }

  ngAfterViewInit(): void {
    if (this.dataReady) {
      this.createScatterChart();
    }
  }

  createScatterChart(): void {
    const clusters = this.chartData.reduce((acc, cur) => {
      const clusterIndex = `Cluster ${cur.Cluster}`;
      if (!acc[clusterIndex]) {
        acc[clusterIndex] = {
          label: clusterIndex,
          data: [],
          borderColor: this.getClusterColor(cur.Cluster),
          backgroundColor: this.getClusterColor(cur.Cluster),
          pointRadius: 6
        };
      }
      acc[clusterIndex].data.push({
        x: cur.Total_Ordered_Quantity,
        y: cur.Num_Orders
      });
      return acc;
    }, {});

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'scatter',
      data: { datasets: Object.values(clusters) },
      options: {
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Total Ordered Quantity'
            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Number of Orders'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  updateChart(): void {
    const clusters = this.chartData.reduce((acc, cur) => {
      const clusterIndex = `Cluster ${cur.Cluster}`;
      const datasetIndex = this.chart.data.datasets.findIndex(dataset => dataset.label === clusterIndex);
      if (datasetIndex !== -1) {
        this.chart.data.datasets[datasetIndex].data.push({
          x: cur.Total_Ordered_Quantity,
          y: cur.Num_Orders
        });
      }
      return acc;
    }, {});

    this.chart.update();
  }

  getClusterColor(cluster: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#7030A0'];
    return colors[cluster % colors.length];
  }
}
