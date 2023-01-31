import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervaloSubs!: Subscription;

  constructor(){
    

    /* this.returnObservable()
    .pipe(
      retry(2) //reintentar obtener una respuesta x cantidad de veces
    )
    .subscribe({
      next: resp => console.log('respuesta obs', resp),
      error: error => console.warn('error', error),
      complete: () => console.log('se completo el observable')
    }
    ); */

    this.intervaloSubs = this.returnInterval().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervaloSubs.unsubscribe();
  }

  returnInterval(){
    return interval(100)
    .pipe(
      //take(10),
      map(valor => valor + 1),
      filter((valor) => (valor % 2 === 0? true: false)),
    );
  }

  returnObservable(){
    let i = -1;
    return new Observable<number>(observer => {

      setInterval(() => {
        i++;

        //emitir siguiente valor
        observer.next(i);

      //provocal completado  
      if (i === 4) {
        observer.complete();
      }

      //provocar error
      if (i === 2) {
        observer.error('algo salio mal en el observable');
      }
      }, 1000)
    });
  }

}
