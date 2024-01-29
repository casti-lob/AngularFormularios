import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Favourite, Person } from '../../interfaces/person';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dinamicos',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {
  person: Person = {
    name: 'Fran',
    favourites: [{id: 1, name: 'Paulaner'}, {id:2, name: 'Voll-Damme'}]
  }
  favouriteId : number = 3;

  newFavourite: Favourite = {
    id: this.favouriteId,
    name: ''
  }

  delete(id:number){
    this.person.favourites = this.person.favourites.filter((favourite)=> favourite.id !== id)
  }

  addFavourite(){
    this.person.favourites.push({...this.newFavourite});
    this.favouriteId++
  }


  submit(){

  }

}
