import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Person {
  gender: string,
  notification: boolean,
}

@Component({
  selector: 'app-switches-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit {

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
    this.myForm.setValue({
      ...this.person,
      terms: null
    })
    this.myForm.valueChanges
    .subscribe(({terms,...person})=>{
      //delete values.terms
      this.person = person
    })
  }

  myForm:FormGroup = this.fb.group({
    gender:['F',Validators.required],
    notification:[false,],
    terms:[false,[Validators.requiredTrue]]
  })

  person:Person ={
    gender:'M',
    notification: false,
  }
  submit(){
    console.log(this.myForm.value);
    const {terms, ...rest} = this.myForm.value
    // const{gender, notification}= this.myForm.value
    // this.person = {gender,notification}
    this.person = rest
    
  }
}
