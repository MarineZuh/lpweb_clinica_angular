import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFormularioComponent } from './paciente-formulario.component';

describe('PacienteFormularioComponent', () => {
  let component: PacienteFormularioComponent;
  let fixture: ComponentFixture<PacienteFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
