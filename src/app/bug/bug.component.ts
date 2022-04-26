import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BugType } from 'src/types/bug.type';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {
  dummyData: BugType = {
    id: "1",
    title: 'Bug 1',
    description: 'Bug 1 description',
    status: 'open',
    severity: 'low',
    created: new Date()
  }


  @Input()
  bug: BugType | null = null;

  isEditState: boolean = false;
  titleControl: FormControl = new FormControl(this.bug?.title || "")
  descriptionControl: FormControl = new FormControl(this.bug?.description || '');


  @Output() onDelete = new EventEmitter<any>();

  setCss() {
    const fn = () => {
      document.getElementById(`bug-${this.bug?.id}-severity`)?.classList.add(`${this.bug?.severity}-priority`);
      document.getElementById(`bug-${this.bug?.id}-status`)?.classList.add(`${this.bug?.status}-status`);
    }

    setTimeout(fn, 0)
  }

  constructor() {
    this.setCss();
  }

  ngOnInit() {
    this.titleControl = new FormControl(this.bug?.title || "")
    this.descriptionControl = new FormControl(this.bug?.description || '');
  }

  delete() {
    this.onDelete.emit(this.bug);
  }

  onEditClick() {
    this.isEditState = true;
    console.log(this.titleControl.value);
  }

  onCancelClick() {
    this.isEditState = false;
    // console.log(this.bug);
    this.setCss()
  }

  onEditSubmit() {
    console.log(this.titleControl.value);

  }
}
