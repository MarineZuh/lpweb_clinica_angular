import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as COMPONENTS from './index'; // componentes
import { PacienteResolver } from './resolvers/paciente.resolver';

const routes: Routes = [
  {
    path: '',
    component: COMPONENTS.PacienteListaComponent,
  },
  {
    path: 'novo',
    component: COMPONENTS.PacienteFormularioComponent,
  },
  {
    path: ':id',
    component: COMPONENTS.PacienteFormularioComponent,
    resolve: {paciente: PacienteResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
