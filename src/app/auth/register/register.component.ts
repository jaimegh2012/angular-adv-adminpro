import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  formPosteado = false;
  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.registerForm = this.configForm();
   }

  ngOnInit(): void {
  }

  configForm(): FormGroup {
   
    return this._fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required, this.passwordsAreEquals ] ],
        terminos: [false, [Validators.required, this.terminosAceptados]],
      }
    );
  }

  crearUsuario(){
    console.log(this.registerForm.value);
    this.formPosteado = true;

    if (this.registerForm.invalid) {
      console.log('formulario no posteado');
      return;
    }

    this._usuarioService.crearUsuario(this.registerForm.value)
    .subscribe({
      next: (resp) => {
        console.log('Usuario registrado');
        console.log({resp});
        this._router.navigateByUrl('/');
      },
      error: (error) => {Swal.fire('Error', error.error.msg, 'error')}
    });
  }

  campoNoValido(campo: string){
    if (this.registerForm.get(campo)?.invalid && this.formPosteado) {
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos(){
    if (this.registerForm.get('terminos')?.value === false && this.formPosteado) {
      return true;
    }else{
      return false;
    }
  }

  passwordsDiferentes(){
    const password = this.registerForm.get('password')?.value;
    const confirmarPassword = this.registerForm.get('password2')?.value;

    if (password === confirmarPassword) {
      return false;
    }else{
      return true;
    }

  }

  passwordsAreEquals(control: AbstractControl): ValidationErrors | null {
    const pass1 = control.parent?.get('password')?.value;
    const pass2 = control.value;

    return !pass1 || !pass2 || pass1 !== pass2 ? { isNotEqual: true } : null;
  }

  terminosAceptados(control: AbstractControl){
    const terminosAceptados = control.value;

    return terminosAceptados === false ? {terminosAceptados: false} : null;
  }

}
