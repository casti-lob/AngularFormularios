import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonRegister } from '../../interfaces/personRegister';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  constructor(private fb: FormBuilder){
  }
  nameSurnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  emailSurnamePattern: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

  
  myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.nameSurnamePattern)]],
    email:['',[Validators.required,Validators.pattern(this.emailSurnamePattern)]],
    username:['',Validators.required],
    password:['',Validators.required],
    passwordConfirm:['',Validators.required]
  })

  person:PersonRegister={
    name: '',
    email: '',
    username:'',
    password:''
  }

  submit(){
    //para mostrar error cuando le da al boton
    this.myForm.markAllAsTouched()
    console.log(this.person);
    
  }

  ifValidField(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }


  ngOnInit(): void {
    this.myForm.valueChanges
    .subscribe(({passwordConfirm, ...person})=>{
      this.person = person
    })
  }


}
