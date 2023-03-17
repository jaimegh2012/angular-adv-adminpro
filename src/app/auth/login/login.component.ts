import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { 
    this.loginForm = this.configForm();
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    console.log({esto: this});
    
    google.accounts.id.initialize({
      client_id: "339760365092-eslp5gjnn6dnmnu6paqp4f7kkgotao3t.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log({estoHan: this});
    console.log('nuestro server', response)

    this._usuarioService.loginGoogle(response.credential).subscribe(resp => {
      console.log({login: resp});
      this._router.navigateByUrl('/');
    });
  }

  configForm(): FormGroup {
   
    return this._fb.group(
      {
        email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        recordar: [false]
      }
    );
  }

  login(){
    this._usuarioService.loginUsuario(this.loginForm.value)
    .subscribe({
      next: (resp) => {
        if(this.loginForm.get('recordar')?.value === true){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        }else{
          localStorage.removeItem('email');
        }
        this._router.navigateByUrl('/');
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    })
  }

}
