import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './update-password.html',
  styleUrls: ['./update-password.scss']
})
export class UpdatePasswordComponent implements OnInit {
  updateForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  hidePassword = true;
  hideConfirmPassword = true;
  email: string = '';
  code: string = '';
  completed = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Get email and code from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.code = params['code'] || '';

      if (!this.email || !this.code) {
        this.router.navigate(['/reset-password']);
      }
    });

    // Initialize animations or other setup
    this.animateForm();
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      this.authService.updatePassword({
        email: this.email,
        code: this.code,
        password: this.updateForm.value.password,
        confirmPassword: this.updateForm.value.confirmPassword
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.completed = true;
            this.successMessage = 'Password updated successfully!';
            // Navigate to login page after a delay
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Failed to update password. Please try again.';
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
