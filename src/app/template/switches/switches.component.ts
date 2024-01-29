import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
interface Persona{
  genero:string,
  notificaciones:boolean
}
@Component({
  selector: 'app-switches',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './switches.component.html'
})
export class SwitchesComponent {

  persona:Persona={
    genero:'F',
    notificaciones:false
  }

  terminos:boolean = false;


  submit(){
    console.log('Formulario enviado');
    
  }

}
