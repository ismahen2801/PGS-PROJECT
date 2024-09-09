import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
 
  isValidEmail(email: string): boolean {
    // Validation logic for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
 
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Check static password
      if (this.email === 'nour.benmiled@esprit.tn' && this.password === 'nour123456') {
        // Redirect to home page
        this.router.navigate(['/user/body']);
      } else {
        // Display error message for incorrect credentials
        alert('Incorrect email or password');
      }
    }
  }
}
