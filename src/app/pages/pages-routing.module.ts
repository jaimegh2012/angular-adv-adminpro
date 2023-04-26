import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
          {path: 'progress', component: ProgressComponent, data: {titulo: 'Barras de Progreso'}},
          {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
          {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuracion de cuenta'}},
          {path: 'promesa', component: PromesaComponent, data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
          {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
          {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
          {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}},
          {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'}},
          {path: 'medicos/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de medicos'}},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
