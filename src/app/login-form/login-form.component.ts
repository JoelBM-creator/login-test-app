import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.constForm();
    document.body.classList.add('bg-img');
  }

  private constForm(): any {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  login(event: Event): any {
    event.preventDefault();
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      console.log(`OK ${value.email} - ${value.rememberMe}`);
    }
  }
}
