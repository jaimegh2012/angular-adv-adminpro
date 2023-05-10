import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busquedasService: BusquedasService
  ){}

  ngOnInit(): void{

    this._activatedRoute.params.subscribe(({termino}) => {
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino: string){
    this._busquedasService.busquedaGlobal(termino).subscribe((resp: any) => {
      console.log('resp', resp);
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    })
  }
}
