import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginFormComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginFormComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Entering no data to function Login', fakeAsync(() => {
    spyOn(component, 'login').and.callThrough();
    component.login(new Event(''));
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Entering valid email and password to function Login', fakeAsync(() => {
    component.loginForm.controls.email.setValue('test@test.com');
    component.loginForm.controls.contrasena.setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(component, 'login').and.callThrough();
    component.login(new Event(''));
  }));

  it('Email field null validity', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('Email field email-type validity', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
    email.setValue('example.com');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('Password field null validity', () => {
    const password = component.loginForm.controls.contrasena;
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('Password field minlength validity', () => {
    const password = component.loginForm.controls.contrasena;
    expect(password.valid).toBeFalsy();
    password.setValue('123');
    expect(password.hasError('minlength')).toBeTruthy();
  });

  it('Should call login', () => {
    spyOn(component, 'login').and.callThrough();
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  });
});
