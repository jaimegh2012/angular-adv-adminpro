import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medicoForm!: FormGroup;
  hospitales: Hospital[] = [];
  hospitalSeleccionado?: Hospital;
  medicoSeleccionado?: Medico;
  constructor(
    private _fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( ({id}) => {
      console.log('tick');
      
      this.cargarMedico(id);
    });

    this.cargarHospitales();
    this.buildForm();

    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(x => x._id === hospitalId);
      console.log(this.hospitalSeleccionado);
      
    });
  }

  cargarMedico(id: string){

    if (id === 'nuevo') {
      return;
    }

    this._medicoService.getMedicoById(id)
    .pipe(
      delay(100)
    )
    .subscribe({
      next: (medico) => {
        console.log('medico', medico);
        const {nombre, hospital: { _id }} : any = medico;      
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital: _id});
      },
      error: (error) => {        
        this._router.navigateByUrl(`dashboard/medicos`);
      }
    });
  }

  buildForm(){
    this.medicoForm = this._fb.group({
      nombre: ['', Validators.required], 
      hospital: ['', Validators.required], 
    });
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
    .subscribe(resp => {
      this.hospitales = resp;
    })
  }


  guardar(){
    const {nombre} = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };

      this._medicoService.actualizarMedico(data).subscribe(medico => {
        console.log('medico actualizado', medico);
        Swal.fire('Creado', `medico ${nombre} actualizado correctamente`, 'success');
      })
      
    }else{
      this._medicoService.crearMedico(this.medicoForm.value).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Creado', `medico ${nombre} creado correctamente`, 'success');
        this._router.navigateByUrl(`dashboard/medicos/${resp._id}`);
      });
    }


    
  }



}
