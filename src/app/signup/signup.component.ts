import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DxToastModule } from 'devextreme-angular';
import { ToastType } from 'devextreme/ui/toast';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DxToastModule, FormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  usernameError = '';
  emailError = '';
  passwordError = '';
  alert = {
    message: '',
    type: 'success' as ToastType,
    visible: false,
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Validate username (should not be empty)
  handleUsernameChange() {
    this.usernameError = this.username.trim() ? '' : 'Username is required.';
  }

  // Validate email format
  handleEmailChange() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = emailRegex.test(this.email.trim()) ? '' : 'Enter a valid email.';
  }

  // Validate password with strong criteria
  handlePasswordChange() {
    if (!this.password) {
      this.passwordError = ''; // Don't show error if field is empty
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.passwordError = passwordRegex.test(this.password)
      ? ''
      : 'Password must be at least 8 characters, include one letter, one number, and one special character.';
  }

  async handleSignup() {
    // Validate all fields before submitting
    this.handleUsernameChange();
    this.handleEmailChange();
    this.handlePasswordChange();
  
    // If any field has an error or is empty, prevent submission
    if (this.usernameError || this.emailError || this.passwordError || !this.username || !this.email || !this.password) {
      return;
    }
  
    try {
      const response: any = await this.http
        .post('https://localhost:44374/api/Auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .toPromise();
  
      if (response?.isSuccessed) {
        this.showAlert('Signup successful! Redirecting...', 'success');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      } else {
        this.showAlert(response.message || 'Signup failed!', 'error');
      }
    } catch (error) {
      this.showAlert('An error occurred!', 'error');
    }
  }  

  showAlert(message: string, type: ToastType) {
    this.alert = { visible: true, message, type };
    setTimeout(() => (this.alert.visible = false), 2000);
  }
}
