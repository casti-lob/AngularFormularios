import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { JsonPipe, LowerCasePipe } from '@angular/common';
import { SmallCountry } from '../interfaces/countries';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, LowerCasePipe],
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit{

  regions: string[]=[];
  countries: SmallCountry[]=[]

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
    ){}

  ngOnInit(): void {
    this.regions= this.countriesService.regions;
    this.myForm.get('region')?.valueChanges
    .subscribe(
      (region)=>{
        this.myForm.get('country')?.reset('');
        this.countriesService.getCountriesByRegion(region)
      
      .subscribe({
        next:
        (countries)=>{
          this.countries =countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
          console.log(countries);
          
        }
      })
    })
  }

  myForm: FormGroup= this.fb.group({
    region: ['',[Validators.required]],
    country:['',[Validators.required]]
  })

  save(){
    if(this.myForm.valid){
      alert('Formulario enviado')
    }else{
      this.myForm.markAllAsTouched()
    }
  }
  
}
