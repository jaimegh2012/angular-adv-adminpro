import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {
  medicos: Medico[] = [];
  cargando: boolean = true;
  imagenSuscription!: Subscription;
  
  constructor(
    private _medicoService: MedicoService,
    private _modalImagenService: ModalImagenService,
    private _busquedasService: BusquedasService
  ){}


  ngOnInit(): void {
    this.cargarMedicos();
    this.imagenSuscription = this._modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarMedicos();
    });
  }

  ngOnDestroy(): void {
    this.imagenSuscription.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;
    this._medicoService.cargarMedicos()
    .subscribe(resp => {
      this.medicos = resp;
      this.cargando = false;
    })
  }

  abrirModal(medico: Medico){
    this._modalImagenService.abrirModal('medicos', medico.img || '', medico._id || '');
  }

  // guardarCambios(medico: Medico){
  //   this._medicoService.actualizarMedico(medico._id!, medico.nombre)
  //   .subscribe(resp => {
  //     Swal.fire('Actualizado', 'Medico actualizado', 'success');
  //   });
  // }

  eliminarMedico(medico: Medico){
    this._medicoService.eliminarHospital(medico._id!)
    .subscribe(resp => {
      this.cargarMedicos();
      Swal.fire('Eliminado', 'Medico eliminado', 'success');
    });
  }

  buscar(termino: string){
    if (termino.length === 0) {
      this.cargarMedicos()
      return;
    }
    this.cargando = true;
    this._busquedasService.buscar('medicos', termino).subscribe(resp => {
      this.medicos = resp;
      this.cargando = false;
    })
  }



}
