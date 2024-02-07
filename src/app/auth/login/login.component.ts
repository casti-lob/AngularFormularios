import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './login.component.html',
  styleUrl:'./styleLogin.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder){}

  myForm:FormGroup = this.fb.group({
    userName:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  login(){
    if(this.myForm.valid){
      //enviamos el formulario
    }else{
      this.myForm.markAllAsTouched()
    }
  }

}
