import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent  implements OnInit {

  @Input() value: string;
  @Output() onClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onClickCell() {
    if (!this.value) {
      this.onClick.emit();
    }
  }

}
