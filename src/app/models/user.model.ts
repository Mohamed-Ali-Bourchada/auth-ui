export interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  agreeTerms?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface UpdatePasswordRequest {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
