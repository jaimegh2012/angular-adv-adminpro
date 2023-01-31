import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {
  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if(false){
    //     resolve('Dentro de promesa');
    //   }else{
    //     reject('algo salio mal en la promesa');
    //   }
    // });

    // promesa.then((resPromesa) => {
    //   console.log('respuesta de promesa atrapada: ', resPromesa);
    // })
    // .catch((error) => {
    //   console.error('Error de promesa capturado: ', error);
    // })


    // console.log('al final de la promesa');

    this.getUsuarios().then(resp => {
      console.log('usuarios', resp);
      
    });

  }

  getUsuarios(){

    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
      .then((resp) => resp.json())
      .then((body) => resolve(body.data))
    });

    return promesa;
  }
}
