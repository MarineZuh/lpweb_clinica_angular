import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  @Input() titulo: string;
  @Input() subtitulo: string;

  constructor() { }

  ngOnInit() {
  }

}
