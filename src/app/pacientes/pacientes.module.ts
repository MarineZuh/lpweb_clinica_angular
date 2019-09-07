import { NgModule } from '@angular/core';
// NgPrime:
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FieldsetModule} from 'primeng/fieldset';

import { SharedModule } from '@shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacienteResolver } from './resolvers/paciente.resolver';
import * as COMPONENTS from './index';


@NgModule({
  declarations: [
    COMPONENTS.PacienteFormularioComponent,
    COMPONENTS.PacienteListaComponent,
    COMPONENTS.TelefonesComponent
  ],
  imports: [
    SharedModule,
    PacientesRoutingModule,
    // NgPrime:
    TableModule,
    ToolbarModule,
    PaginatorModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    FieldsetModule,
  ],
  providers: [
    PacienteResolver,
  ]
})
export class PacientesModule { }
