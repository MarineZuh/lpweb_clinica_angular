import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Paciente } from '@shared/models';
import { PacienteService } from './../services/paciente.service';

@Injectable()
export class PacienteResolver implements Resolve<Observable<Paciente>> {
  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private msgService: MessageService,

  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Paciente> {
    const id = route.params.id;
    if (id === undefined || isNaN(+id) || +id <= 0) {
      this.router.navigate(['nao-encontrado']);
      return;
    }
    this.msgService.add({ key: 'process', severity: 'info', closable: false, detail: 'Carregando...' });
    return this.pacienteService.getPaciente(id).pipe(
      map(resposta => {
        const paciente = resposta.dados as Paciente;
        return paciente;
      }),
      finalize(() => this.msgService.clear('process')),
    );
  }
}
