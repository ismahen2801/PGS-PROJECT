import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
 
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent  {
  cards = [
    {
      title: 'Time Savings',
      description: 'How much time do you lose tracking down invoices and other paperwork?',
      icon: 'assets/img/icon1.png'
    },
    {
      title: 'Consistency',
      description: 'Worried about hurting your bottom line from mismanagement of inventory or fuel quantities?',
      icon: 'assets/img/icon2.png'
    },
   
    {
      title: 'Real-Time Insights',
      description: 'Our real-time monitoring systems ensure you re always informed with the latest updates, helping you make  informed decisions to enhance efficiency and productivity',
      icon: 'assets/img/icon3.png'
    },
    {
      title: 'Eco Innovation',
      description: 'Are you ready to stand out by protecting the planet? Enhance your eco-friendly practices by focusing on sustainable operations,with our advanced systems designed to minimize losses and pollution',
      icon: 'assets/img/icon4.png'
    },
 
  ];
  showModal: boolean = false;
 
  constructor(private router: Router) {}
 
  openModal(event: Event): void {
    event.preventDefault();  // Empêche la navigation vers l'URL dans href="#"
    this.showModal = true;
  }
 
  closeModal(event: Event): void {
    event.preventDefault();
    this.showModal = false;
 
    // Navigation vers /user/home
    this.router.navigate(['/user/body']);
  }
}