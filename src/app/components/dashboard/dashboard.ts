import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Fullscreen animated background -->
    <div class="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 animate-gradient-x -z-10"></div>

    <!-- Main content -->
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              (click)="logout()"
              class="bg-stripe-purple hover:bg-stripe-purple-hover text-white py-2 px-4 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md">
              Logout
            </button>
          </div>
        </header>
        <main>
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
              <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div class="text-center animate-fade-in-up">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-4">Welcome to your Dashboard</h2>
                  <p class="text-gray-500">This is a placeholder for your dashboard content.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
