import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
 
  teamMembers = [
    { name: 'Mohamed Bouabdallah', imagePath: 'assets/img/mohamed.PNG', altText: 'Member 1', facebook: 'https://www.facebook.com/hammalc03', linkedin: 'https://www.linkedin.com/in/mohamed-bouabdallah-ba5627253/' },
    { name: 'Eya El Behy', imagePath: 'assets/img/eyaaa.PNG', altText: 'Member 2', facebook: 'https://www.facebook.com/profile.php?id=100042000013564', linkedin: 'https://www.linkedin.com/in/eya-el-behy-73b69a279/' },
    { name: 'Ons Hamdi', imagePath: 'assets/img/ons.jpg', altText: 'Member 3', facebook: 'https://www.facebook.com/ons.hamdi.3', linkedin: 'https://www.linkedin.com/in/ons-hamdi-99b27b258/' },
    { name: 'Nour Ben Miled', imagePath: 'assets/img/nour.jpg', altText: 'Member 4', facebook: 'https://www.facebook.com/nour.benmiled.71/', linkedin: 'https://www.linkedin.com/in/nour-ben-miled-12a4b122a/' },
    { name: 'Ismahen Ben Halima', imagePath: 'assets/img/ismahen.jpg', altText: 'Member 5', facebook: 'https://www.facebook.com/ismahen.benhlima.1', linkedin: 'http://linkedin.com' },
    { name: 'Linda Boukhit', imagePath: 'assets/img/linda.jpg', altText: 'Member 6', facebook: 'https://www.facebook.com/linda.lili.7334', linkedin: 'https://www.linkedin.com/in/linda-boukhit-8a004b216/' }
  ];
 
  constructor(private router: Router) { }
 
  ngOnInit(): void {
   
  }
 
}