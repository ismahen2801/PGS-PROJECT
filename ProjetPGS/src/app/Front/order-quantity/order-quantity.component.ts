import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OrderQuantityService } from 'src/app/service/order-quantity.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import this at the top of your file

@Component({
  selector: 'app-order-quantity',
  templateUrl: './order-quantity.component.html',
  styleUrls: ['./order-quantity.component.css']
})
export class OrderQuantityComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  chart: any;

  constructor(private orderQuantityService: OrderQuantityService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.orderQuantityService.getForecastData().subscribe({
      next: (data) => {
        // Check for the correct data properties
        if (data && data.existing_dates && data.future_dates && data.future_forecast) {
          this.createChart(data);
        } else {
          console.error('Data is incomplete or undefined:', data);
        }
      },
      error: (error) => {
        console.error('Failed to load forecast data:', error);
      }
    });
  }
  

  createChart(data: any): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.existing_dates.concat(data.future_dates), // Corrected data keys
          datasets: [{
            label: 'Existing Data',
            data: data.existing_data, // Corrected data keys
            borderColor: 'blue',
            fill: false
          }, {
            label: 'Forecast Data',
            data: [...Array(data.existing_data.length).fill(null), ...data.future_forecast], // Align forecast data right after existing data
            borderColor: 'red',
            borderDash: [5, 5],
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'yyyy-MM-dd',
                displayFormats: {
                  day: 'yyyy-MM-dd'
                }
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Quantité totale commandée '
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    } else {
      console.error('Canvas context not available.');
    }
  }
}
