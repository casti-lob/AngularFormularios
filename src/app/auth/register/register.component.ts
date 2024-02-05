import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonRegister } from '../../interfaces/personRegister';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { ValidateEmailService } from '../../shared/validators/validate-email.service';
import { UserService } from '../../services/user.service';
import { Observable, catchError, ignoreElements, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,AsyncPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  constructor(private fb: FormBuilder,
    private validatorsService : ValidatorsService,
    private emailValidatorsService: ValidateEmailService,
    private userService:UserService
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

  person$!:Observable<PersonRegister>
  personError$!: Observable<any>

  get emailErrosMsg(): string{
    const errors = this.myForm.get('email')?.errors;
    let errorMsg=''
    if(errors){
      if(errors['required']){
        errorMsg = 'Email es obligatorio'
      }else if(errors['pattern']){
        errorMsg = 'Email no tiene el formato'
      }else if(errors['emailTaken']){
        errorMsg = 'Email ya esta en usao'
      }
      
    }
    return errorMsg;
  }

  submit(){
    //para mostrar error cuando le da al boton
    /*
   
    if(this.myForm.valid){
      //enviar al server
      this.userService.postUser(this.person)
      .subscribe({
        next: (person)=>{

        }
      })
      console.log('Enviado');
      
    }
    */
    this.myForm.markAllAsTouched()
    console.log(this.person);
    if(this.myForm.valid){
    this.person$ = this.userService.postUser(this.person)
    this.personError$ = this.person$.pipe(
      ignoreElements(),
      catchError((err)=>of(err))
    )
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
