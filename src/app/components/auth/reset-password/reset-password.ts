import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Initialize animations or other setup
    this.animateForm();
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      this.authService.requestPasswordReset({ email: this.resetForm.value.email })
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              // Navigate to code verification page immediately
              this.router.navigate(['/verify-code'], {
                queryParams: {
                  email: this.resetForm.value.email,
                  justSent: 'true'
                }
              });
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message || 'Failed to send reset instructions. Please try again.';
            this.shakeForm();
          }
        });
    }, 1000);
  }

  // Animation methods
  animateForm(): void {
    // You can add custom animation logic here
    console.log('Form animations initialized');
  }

  shakeForm(): void {
    const formElement = document.querySelector('.animate-fade-in-up');
    if (formElement) {
      formElement.classList.add('animate-shake');
      setTimeout(() => {
        formElement.classList.remove('animate-shake');
      }, 500);
    }
  }
}
