import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Erro, Resposta } from '@shared/models';

export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log({ req, next });

    req = this.setHeader(req);

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.checaPorErrors(event);
        }
      }),
      catchError((err, cought) => {
        if (err.status === 404) {
          this.router.navigate(['nao-encontrado']);
        }
        return throwError(err);
      }),

    );
  }

  private checaPorErrors(event: HttpResponse<any>) {
    const resposta: Resposta<any> = event.body;
    if (resposta && resposta.erros && resposta.erros.length > 0) {
      resposta.erros.forEach((erro: Erro) => {
        const error: Error = { name: 'Error', message: erro.mensagem };
        console.log(error);
        throw error;
      });
    }
  }

  private setHeader(request: HttpRequest<any> ): HttpRequest<any>   {
    let contentType = '';
    if (request.headers.has('Content-Type')) {
      contentType = request.headers.get('Content-Type');
    }

    return request.clone({
      setHeaders: {
        'Content-Type': (contentType === '' ? 'application/json' : contentType)
      }
    });
  }
}
