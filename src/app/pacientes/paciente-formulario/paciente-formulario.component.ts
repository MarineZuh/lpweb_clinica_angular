import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { finalize } from 'rxjs/operators';

import { PacienteService } from './../services/paciente.service';
import { Paciente } from '@shared/models';
import { ObjetosUtil } from '@shared/util';

@Component({
  selector: 'app-paciente-formulario',
  templateUrl: './paciente-formulario.component.html',
  styleUrls: ['./paciente-formulario.component.css']
})
export class PacienteFormularioComponent implements OnInit {

  titulo = 'Novo Paciente';
  ehEdicao = false;

  form: FormGroup;

  paciente: Paciente;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
    private pacienteService: PacienteService,

    private msgService: MessageService,
  ) { }

  ngOnInit() {
    this.criaForm();

    this.paciente = this.route.snapshot.data.paciente;
    console.log(this.paciente);
    if (this.paciente !== undefined) {
      this.ehEdicao = true;
      this.titulo = 'Editar Paciente';
      ObjetosUtil.deletaAtributosNulos(this.paciente);
      this.form.patchValue(this.paciente);
    }

  }

  private criaForm() {
    this.form = this.fb.group({
      id: null,
      nomeCrianca: [null, [Validators.required]],
      nomeResponsavel: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      planoSaude: this.fb.group({
        id: null,
        nome: null,
      }),
      endereco: this.fb.group({
        id: null,
        cep: [null, [Validators.required]],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      }),
      telefones: this.fb.array([]),
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msgService.add({ key: 'msgs', severity: 'warn', detail: 'Há campos inválidos no formulário!' });
      return;
    }
    if (this.ehEdicao) {
      this.atualizaPaciente();
    } else {
      this.salvaPaciente();
    }

  }

  private salvaPaciente() {
    const paciente = this.getFormPaciente();
    console.log({ paciente });
    this.msgService.add({ key: 'process', severity: 'info', detail: 'Salvando Paciente!', closable: false, });
    this.pacienteService.salvaPaciente(paciente).pipe(
      finalize(() => this.msgService.clear('process'))
    ).subscribe(resposta => {
      console.log({ resposta });
      const p = resposta.dados as Paciente;
      this.router.navigate(['/pacientes']);
      this.msgService.add({ key: 'msgs', severity: 'success', detail: `Paciente ${p.nomeCrianca}(${p.id}) salvo!` });
    });
  }

  private atualizaPaciente() {
    const paciente = this.getFormPaciente();
    this.msgService.add({ key: 'process', severity: 'info', detail: 'Atualizando Paciente!', closable: false, });
    this.pacienteService.atualizaPaciente(paciente).pipe(
      finalize(() => this.msgService.clear('process'))
    ).subscribe(resposta => {
      console.log({ resposta });
      const p = resposta.dados as Paciente;
      this.router.navigate(['/pacientes']);
      this.msgService.add({ key: 'msgs', severity: 'success', detail: `Paciente ${p.nomeCrianca}(${p.id}) atualizado!` });
    });

  }

  private getFormPaciente(): Paciente {
    const paciente = this.form.value;
    paciente.dataNascimento = this.converteData(paciente.dataNascimento);
    return paciente;
  }

  private converteData(data): string {
    if (data instanceof Date)  {
      return data.getDay() + '/' + data.getMonth() + '/' + data.getFullYear();
    }
    return data;
  }
  cancelar() {
    this.router.navigate(['/pacientes']);
  }
}
