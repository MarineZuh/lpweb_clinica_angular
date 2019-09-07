import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Paciente } from '@shared/models';
import { ObjetosUtil } from '@shared/util';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html',
  styleUrls: ['../paciente-formulario.component.css']
})
export class TelefonesComponent implements OnInit {

  @Input() telefonesFormArray: FormArray;
  @Input() paciente: Paciente;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.paciente) {
      this.paciente.telefones.forEach(telefone => {
        const form = this.criaItem();
        ObjetosUtil.deletaAtributosNulos(telefone);
        form.patchValue(telefone);
        this.addItem(form);
      });
    } else {
      this.addItem(this.criaItem());
    }
  }

  addItem(item: FormGroup) {
    this.telefonesFormArray.push(item);
  }

  removeItem(index: number) {
    this.telefonesFormArray.removeAt(index);
  }

  criaItem(): FormGroup {
    return this.fb.group({
      id: null,
      tipo: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      nomeContato: [null, [Validators.required]],
    });
  }

}
