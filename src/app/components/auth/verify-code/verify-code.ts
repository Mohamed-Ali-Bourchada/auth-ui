import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './verify-code.html',
  styleUrls: ['./verify-code.scss']
})
export class VerifyCodeComponent implements OnInit {
  verifyForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  email: string = '';
  justSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    // Get email from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.justSent = params['justSent'] === 'true';

      if (!this.email) {
        this.router.navigate(['/reset-password']);
      }

      if (this.justSent) {
        this.successMessage = 'Reset instructions sent! Check your email for a verification code.';

        // Clear the success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    });

    // Initialize animations or other setup
    this.animateForm();
  }

  onSubmit(): void {
    if (this.verifyForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      this.authService.verifyResetCode({
        email: this.email,
        code: this.verifyForm.value.code
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            // Navigate to update password page
            this.router.navigate(['/update-password'], {
              queryParams: {
                email: this.email,
                code: this.verifyForm.value.code
              }
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Invalid verification code. Please try again.';
          this.shakeForm();
        }
      });
    }, 1000);
  }

  resendCode(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      this.authService.requestPasswordReset({ email: this.email })
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Verification code resent! Check your email.';

            // Clear the success message after 5 seconds
            setTimeout(() => {
              this.successMessage = '';
            }, 5000);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message || 'Failed to resend code. Please try again.';
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
