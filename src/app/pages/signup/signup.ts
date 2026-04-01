import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input';
import { ButtonComponent } from '../../components/button/button';
import { DisplayComponent } from '../../components/display/display';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, DisplayComponent],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  signupData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.signupData.name || !this.signupData.email || 
        !this.signupData.password || !this.signupData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (!this.isValidEmail(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.successMessage = 'Signup successful! You can now login.';
      console.log('Signup Data:', this.signupData);
      
      this.signupData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    }, 1500);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}