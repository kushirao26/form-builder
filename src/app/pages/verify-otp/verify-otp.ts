import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css'
})
export class VerifyOtpComponent {
  otp: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  verifyOtp() {
    if (this.otp === '123456') {
      this.successMessage = 'OTP verified successfully!';
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/builder']);
      }, 1000);
    } else {
      this.errorMessage = 'Invalid OTP. Try again.';
      this.successMessage = '';
    }
  }

  resendOtp() {
    this.successMessage = 'A new OTP has been sent.';
    this.errorMessage = '';
  }
}