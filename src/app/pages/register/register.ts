import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;

  errorMessage = '';

  constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
  ){

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const error = this.authService.register(
      this.registerForm.value
    );

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.router.navigate(['/login']);
  }
}
