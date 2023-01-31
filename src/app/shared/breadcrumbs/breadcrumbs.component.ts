import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { pipe, filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string = '';
  tituloSubs!: Subscription;

  constructor(
    private _router: Router
  ) { 
    this.tituloSubs = this.getDataRuta().subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
      console.log('event', titulo);
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRuta(){
    return this._router.events
    .pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map(event => event.snapshot.data)
    )
  }

}
