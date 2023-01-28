import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

 labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
 data1: number[] = [ 350, 450, 100 ];

 labels2: string[] = [ 'Libros', 'Peliculas', 'Historietas' ];
 data2: number[] = [ 50, 250, 1000 ];
 

}
