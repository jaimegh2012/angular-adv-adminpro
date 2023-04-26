import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  imagenSuscription!: Subscription;
  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
    private _busquedasService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imagenSuscription.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();
    this.imagenSuscription = this._modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarHospitales();
    });
  }
  
  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales()
    .subscribe(resp => {
      this.hospitales = resp;
      this.cargando = false;
    })
  }

  guardarCambios(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
    .subscribe(resp => {
      Swal.fire('Actualizado', 'Hospital actualizado', 'success');
    });
  }

  eliminarHospital(hospital: Hospital){
    this._hospitalService.eliminarHospital(hospital._id!)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Eliminado', 'Hospital eliminado', 'success');
    });
  }

  async swalAlertCrearHospital(){
    const { value } = await Swal.fire<string>({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (!value) {
      return;
    }

    if (value!.trim().length > 0) {
      this._hospitalService.crearHospital(value!)
      .subscribe(resp => {
        this.cargarHospitales();
      });
    }    
  }

  abrirModal(hospital: Hospital){
    this._modalImagenService.abrirModal('hospitales', hospital.img || '', hospital._id || '');
  }

  buscar(termino: string){
    if (termino.length === 0) {
      this.cargarHospitales()
      return;
    }
    this.cargando = true;
    this._busquedasService.buscar('hospitales', termino).subscribe(resp => {
      this.hospitales = resp;
      this.cargando = false;
    })
  }

}
