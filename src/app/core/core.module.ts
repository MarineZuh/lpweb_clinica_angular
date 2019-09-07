import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderInterceptor } from './interceptors/header.interceptor';
import { GlobalErrorHandler } from './error/handler/global-error.handler';
import { SharedModule } from '@shared/shared.module';
import { NaoEncontradoComponent } from '@core/index';

@NgModule({
  declarations: [
    NaoEncontradoComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NaoEncontradoComponent,
  ],
  providers: []
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
      ]
    };
  }

}
