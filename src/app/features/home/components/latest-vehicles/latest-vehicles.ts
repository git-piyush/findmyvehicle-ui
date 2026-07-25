import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Vehicle {

  image:string;

  brand:string;

  number:string;

  location:string;

  type:string;

  status:string;

}

@Component({

  selector:'app-latest-vehicles',

  standalone:true,

  imports:[
    CommonModule,
    MatIconModule
  ],

  templateUrl:'./latest-vehicles.html',

  styleUrl:'./latest-vehicles.scss'

})

export class LatestVehiclesComponent{

vehicles:Vehicle[]=[

{
image:'assets/images/demo/honda.png',
brand:'Honda City',
number:'KA01AB1234',
location:'Bengaluru, Karnataka',
type:'directions_car',
status:'Missing'
},

{
image:'assets/images/demo/creta.png',
brand:'Hyundai Creta',
number:'KA05CD4567',
location:'Mysuru, Karnataka',
type:'directions_car',
status:'Missing'
},

{
image:'assets/images/demo/bullet.png',
brand:'Royal Enfield',
number:'KA09EF9876',
location:'Hubballi, Karnataka',
type:'two_wheeler',
status:'Missing'
},

{
image:'assets/images/demo/apache.png',
brand:'TVS Apache',
number:'KA41GH6543',
location:'Belagavi, Karnataka',
type:'two_wheeler',
status:'Missing'
}

];

}