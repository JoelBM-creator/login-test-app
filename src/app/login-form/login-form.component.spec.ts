import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let buttonAcceder: DebugElement;
  let emailEl: DebugElement;
  let contrasenaEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    emailEl = fixture.debugElement.query(By.css('input[type=email]'));
    contrasenaEl = fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Entering invalid email and password to function Login', fakeAsync(() => {
    spyOn(component, 'login').and.callThrough();
    component.login(new Event(''));
    expect(component.login).toHaveBeenCalled;
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Entering valid email and password to function Login', fakeAsync(() => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['contrasena'].setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(component, 'login').and.callThrough();
    component.login(new Event(''));
    expect(component.login).toHaveBeenCalled;
  }));
});
