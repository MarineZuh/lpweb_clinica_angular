import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageService } from 'primeng/components/common/messageservice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule.forRoot(), // modulo e providers

  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
