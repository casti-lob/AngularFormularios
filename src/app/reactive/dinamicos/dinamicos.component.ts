import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  constructor(private fb:FormBuilder){}

  get favourites(){
    return this.myForm.get('favorites') as FormArray
  }

  newFavorite: FormControl = this.fb.control('',Validators.required)

  myForm:FormGroup= this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array([
      ['Estrella',Validators.required],
      ['Alhambra',Validators.required]
    ],Validators.required)

  })

  delete(i:number){
    this.favourites.removeAt(i)
  }

  add(){
    if( this.newFavorite.valid){
      this.favourites.push(this.fb.control(this.newFavorite.value, Validators.required))
      this.newFavorite.reset()
    }
  }
}
