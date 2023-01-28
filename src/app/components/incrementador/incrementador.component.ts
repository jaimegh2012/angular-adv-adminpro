import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 10;
  @Input() btnClass: string = 'btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get obtenerPorcentaje(){
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number){

    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return; 
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return; 
    }
    this.progreso = Number(this.progreso) + Number(valor);
    this.valorSalida.emit(this.progreso);
    console.log('progres', this.progreso);
  }


  cambioValorInput(valor: any){
    if (valor > 100) {
      this.progreso = 100;
    }else if (valor < 0 || valor == null) {
      this.progreso = 0;
    }else{
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
