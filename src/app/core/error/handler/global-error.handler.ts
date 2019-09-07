import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
  ) { }

  handleError(error: Error | HttpErrorResponse) {

    // const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.gerarMsg('Sem conexão', 'Tente novamente mais tarde!');
      } else {

          this.gerarMsg(`${error.status} - ${error.name}`, `${error.message}`);

      }
    } else {
      this.gerarMsg(`${error.name}`, `${error.message}`);
    }
    console.error('Erro capturado: ', error);
  }

  private gerarMsg(titulo, msg) {
    const mensagemService = this.injector.get(MessageService);
    const zone = this.injector.get(NgZone);
    zone.run(() => mensagemService.add({ key: 'msgs', severity: 'error', summary: titulo, detail: msg }));

  }
}
