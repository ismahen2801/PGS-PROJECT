import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountUp } from 'countup.js';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
  constructor(private router: Router) { }
 
  ngOnInit(): void {
    this.initCounters();
  }
  initCounters(): void {
    const counters = document.querySelectorAll('.purecounter');
    counters.forEach(counter => {
      const startAttr = counter.getAttribute('data-purecounter-start');
      const start = startAttr ? parseInt(startAttr) : 0; // Utilisez une valeur par défaut ou une autre gestion des erreurs si nécessaire
 
      const endAttr = counter.getAttribute('data-purecounter-end');
      const end = endAttr ? parseInt(endAttr) : 0; // Utilisez une valeur par défaut ou une autre gestion des erreurs si nécessaire
 
      const durationAttr = counter.getAttribute('data-purecounter-duration');
      const duration = durationAttr ? parseInt(durationAttr) : 0; // Utilisez une valeur par défaut ou une autre gestion des erreurs si nécessaire
            const options = {
        startVal: start,
        duration: duration,
        separator: ''
      };
      const countUp = new CountUp(counter as HTMLElement, end, options);
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }
 
 
   
 
  onAboutClick(): void {
    this.router.navigate(['/user/about']);
  }
 
}