export interface registerData extends loginData, email {
  name: string;
  rePassword: string;
  phone: string;
}

export interface loginData extends email {
  password: string;
}
export interface email {
  email: string;
}

export interface resetCode {
  resetCode: string;
}
export interface resetPassword extends email {
  newPassword: string;
}

// Uth responses

// success

export interface uthSuccess {
  message: string;
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

// success

// Error

export interface uthError {
  statusMsg: string;
  message: string;
}
// Error

// Uth responses
