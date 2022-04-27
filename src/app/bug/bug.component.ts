import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';
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
  severity: 'low' | 'medium' | 'high' = this.bug?.severity || 'low';
  status: 'open' | 'in-progress' | 'done' = this.bug?.status || 'open';


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

    const fn = () => {
      const id1 = `${this.bug?.severity}-priority-${this.bug?.id}`
      const id2 = `${this.bug?.status}-status-${this.bug?.id}`

      document.getElementById(id1)?.classList.remove("bg-light", "text-dark")
      document.getElementById(id1)?.classList.add(`${this.bug?.severity}-priority`)

      document.getElementById(id2)?.classList.remove("bg-light", "text-dark")
      document.getElementById(id2)?.classList.add(`${this.bug?.status}-status`)
    }

    setTimeout(fn, 1)
  }

  setSeverity(severity: 'low' | 'medium' | 'high', event: any = "") {
    // Remove current selected class
    document.getElementById(`${this.severity}-priority-${this.bug?.id}`)?.classList.remove(`${this.severity}-priority`) // Remove current selected class
    document.getElementById(`${this.severity}-priority-${this.bug?.id}`)?.classList.add("bg-light", "text-dark") // Set CSS to default

    this.severity = severity;

    // Set CSS colour of selected priority
    document.getElementById(event.target.id)?.classList.remove("bg-light", "text-dark") // Remove current selected class
    document.getElementById(event.target.id)?.classList.add(`${this.severity}-priority`) // Set CSS to default
  }

  setStatus(status: 'open' | 'in-progress' | 'done', event: any = "") {
    // Remove current selected class
    document.getElementById(`${this.status}-status-${this.bug?.id}`)?.classList.remove(`${this.status}-status`) // Remove current selected class
    document.getElementById(`${this.status}-status-${this.bug?.id}`)?.classList.add("bg-light", "text-dark") // Set CSS to default

    this.status = status;

    // Set CSS colour of selected priority
    document.getElementById(event.target.id)?.classList.remove("bg-light", "text-dark") // Remove current selected class
    document.getElementById(event.target.id)?.classList.add(`${this.status}-status`) // Set CSS to default
  }

  onCancelClick() {
    this.isEditState = false;
    this.setCss()
  }

  onEditSubmit() {
    API
      .get('BugsApi', '/bugs', {})
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
