import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, LoginRequest, SignupRequest, AuthResponse } from '../models/user.model';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    // This is a mock implementation. In a real app, you would make an HTTP request to your backend
    const mockResponse: AuthResponse = {
      user: {
        id: '1',
        name: 'Demo User',
        email: loginRequest.email
      },
      token: 'mock-jwt-token'
    };

    // Simulate API delay
    return of(mockResponse).pipe(
      delay(800),
      tap(response => {
        this.setAuthState(response);
      })
    );
  }

  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    // This is a mock implementation. In a real app, you would make an HTTP request to your backend
    const mockResponse: AuthResponse = {
      user: {
        id: '1',
        name: signupRequest.name,
        email: signupRequest.email
      },
      token: 'mock-jwt-token'
    };

    // Simulate API delay
    return of(mockResponse).pipe(
      delay(800),
      tap(response => {
        this.setAuthState(response);
      })
    );
  }

  logout(): void {
    // Clear user from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
    // Reset auth state
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuthState(authResponse: AuthResponse): void {
    // Store user and token in local storage
    localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    localStorage.setItem('token', authResponse.token);
    
    // Update auth state
    this.currentUserSubject.next(authResponse.user);
    this.isAuthenticatedSubject.next(true);
  }
} 