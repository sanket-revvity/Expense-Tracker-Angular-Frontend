import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DxToastModule } from 'devextreme-angular';
import { ToastType } from 'devextreme/ui/toast';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [DxToastModule, FormsModule, NgIf, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errors = { email: '', password: '' };
  alert = {
    message: '',
    type: 'success' as ToastType,
    visible: false
  };

  constructor(private http: HttpClient, private router: Router) {}

  validateForm(): boolean {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!this.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!this.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (this.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/.test(this.password)) {
      newErrors.password = 'Password must contain at least one letter, one number, and one special character';
      valid = false;
    }

    this.errors = newErrors;
    return valid;
  }

  async handleLogin() {
    if (!this.validateForm()) return;

    try {
      const response: any = await this.http
        .post('https://localhost:44374/api/Auth/login', {
          email: this.email,
          password: this.password
        })
        .toPromise();

      if (response?.isSuccessed) {
        localStorage.setItem('accessToken', response.data.accessToken);
        this.showAlert('Login successful!', 'success');
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      } else {
        this.showAlert('Invalid credentials!', 'error');
      }
    } catch (error) {
      this.showAlert('Login failed! Check your credentials.', 'error');
    }
  }

  showAlert(message: string, type: string) {
    this.alert = { visible: true, message, type: type as ToastType };
    setTimeout(() => (this.alert.visible = false), 2000);
  }
}
