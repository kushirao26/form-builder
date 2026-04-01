import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input';
import { ButtonComponent } from '../../components/button/button';
import { DisplayComponent } from '../../components/display/display';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, DisplayComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.successMessage = 'Login successful!';
      console.log('Login Data:', this.loginData);
    }, 1500);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}