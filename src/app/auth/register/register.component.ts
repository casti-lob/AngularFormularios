import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonRegister } from '../../interfaces/personRegister';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { ValidateEmailService } from '../../shared/validators/validate-email.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  constructor(private fb: FormBuilder,
    private validatorsService : ValidatorsService,
    private emailValidatorsService: ValidateEmailService
    ){
  }
 
  
  
  myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.nameSurnamePattern)]],
    email:['',[Validators.required,Validators.pattern(this.validatorsService.emailSurnamePattern)],[this.emailValidatorsService]],
    username:['',[Validators.required, this.validatorsService.forbiddenNameValidator('fran')]],
    password:['',[Validators.required, Validators.minLength(6)]],
    passwordConfirm:['',Validators.required]
  },{validators:[this.validatorsService.equalFields('password','passwordConfirm')]})

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
    if(this.myForm.valid){
      //enviar al server
      console.log('Enviado');
      
    }
    
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
