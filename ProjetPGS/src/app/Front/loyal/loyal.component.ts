import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartType, registerables, TooltipItem, TooltipModel } from 'chart.js';
import { LoyalData, LoyalService } from 'src/app/service/loyal.service';


interface DataPoint {
  x: number;
  y: number;
  code: string;
  loyal: string;
}

@Component({
  selector: 'app-loyal',
  templateUrl: './loyal.component.html',
  styleUrls: ['./loyal.component.css']
})
export class LoyalComponent implements OnInit {
  @ViewChild('svmChart', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<'scatter'>;

  constructor(private loyalService: LoyalService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loyalService.getLoyaltyData().subscribe({
      next: (data: LoyalData) => {
        if (!data || !data.tenure || !data.customerCodes || data.tenure.length !== data.customerCodes.length) {
          console.error('Data is missing or incomplete');
          return;
        }
        this.createChart(data);
      },
      error: error => {
        console.error('Error fetching SVM data:', error);
      }
    });
  }

  createChart(data: LoyalData): void {
    const dataPoints: DataPoint[] = data.tenure.map((tenure, index) => ({
      x: tenure,
      y: index,
      code: data.customerCodes[index],
      loyal: data.loyalty[index] ? 'Loyal' : 'Not Loyal'
    }));

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Customer Loyalty',
          data: dataPoints,
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      },
      options: {
        scales: {
          x: { type: 'linear', position: 'bottom' },
          y: { type: 'linear' }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<'scatter'>) => {
                const raw = context.raw as DataPoint;  // Explicit type assertion
                return `Code: ${raw.code}, Status: ${raw.loyal}`;
              }
            }
          }
        }
      }
    });
  }
}
