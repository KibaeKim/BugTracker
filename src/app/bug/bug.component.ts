import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';
import { BugType } from 'src/types/bug.type';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, AfterViewInit {
  dummyData: BugType = {
    id: "1",
    title: 'Bug 1',
    description: 'Bug 1 description',
    status: 'open',
    priority: 'low',
    created: new Date()
  }

  @Input()
  bug: BugType = this.dummyData;

  isEditState: boolean = false;
  titleControl: FormControl = new FormControl(this.bug?.title || "")
  descriptionControl: FormControl = new FormControl(this.bug?.description || '');
  priority: 'low' | 'medium' | 'high' = this.bug?.priority || 'low';
  status: 'open' | 'in-progress' | 'done' = this.bug?.status || 'open';

  ngAfterViewInit(): void {
    this.open?.nativeElement.classList.add('active');
    switch (this.bug.status) {
      case 'open':
        this.statusView?.nativeElement.classList.add('bg-success');
        break;
      case 'in-progress':
        this.statusView?.nativeElement.classList.add('bg-primary');
        break;
      case 'done':
        this.statusView?.nativeElement.classList.add('bg-danger');
        break;
    }
    switch (this.bug.priority) {
      case 'low':
        this.priorityView?.nativeElement.classList.add('bg-success');
        break;
      case 'medium':
        this.priorityView?.nativeElement.classList.add('bg-warning');
        break;
      case 'high':
        this.priorityView?.nativeElement.classList.add('bg-danger');
        break;
    }
  }

  @ViewChild('status') statusView: ElementRef | null = null;
  @ViewChild('priority') priorityView: ElementRef | null = null;

  @Output() onDelete = new EventEmitter<any>();

  @ViewChild('open') open: ElementRef | null = null;
  @ViewChild('inProgress') inProgress: ElementRef | null = null;
  @ViewChild('done') done: ElementRef | null = null;
  @ViewChild('low') low: ElementRef | null = null;
  @ViewChild('medium') medium: ElementRef | null = null;
  @ViewChild('high') high: ElementRef | null = null;




  setCss() {
    const fn = () => {
      document.getElementById(`bug-${this.bug?.id}-priority`)?.classList.add(`${this.bug?.priority}-priority`);
      document.getElementById(`bug-${this.bug?.id}-status`)?.classList.add(`${this.bug?.status}-status`);
    }

    setTimeout(fn, 0)
  }

  constructor() {
    this.setCss();
    console.log(this.bug);
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
      const id1 = `${this.bug?.priority}-priority-${this.bug?.id}`
      const id2 = `${this.bug?.status}-status-${this.bug?.id}`

      document.getElementById(id1)?.classList.remove("bg-light", "text-dark")
      document.getElementById(id1)?.classList.add(`${this.bug?.priority}-priority`)

      document.getElementById(id2)?.classList.remove("bg-light", "text-dark")
      document.getElementById(id2)?.classList.add(`${this.bug?.status}-status`)
    }

    setTimeout(fn, 1)
  }

  stateStatus = 'open'
  statePriority = 'low'

  setState(state: 'open' | 'in-progress' | 'done' | 'low' | 'medium' | 'high') {

    if (state === 'open' || state === 'in-progress' || state === 'done') {
      this.removeActiveClassFromState(this.stateStatus)
      this.setStatus(state);
    } else {
      this.removeActiveClassFromState(this.statePriority)
      this.setpriority(state);
    }

    this.addActiveClassToState(state);
  }

  setStatus(status: 'open' | 'in-progress' | 'done') {
    this.bug.status = status;
    this.stateStatus = status;
  }

  setpriority(priority: 'low' | 'medium' | 'high') {
    this.bug.priority = priority;
    this.statePriority = priority;
  }

  // Removes 'active' from current active state
  removeActiveClassFromState(state: string) {
    switch (state) {
      case 'open':
        this.open?.nativeElement.classList.remove('active');
        break;
      case 'in-progress':
        this.inProgress?.nativeElement.classList.remove('active');
        break;
      case 'done':
        this.done?.nativeElement.classList.remove('active');
        break;
      case 'low':
        this.low?.nativeElement.classList.remove('active');
        break;
      case 'medium':
        this.medium?.nativeElement.classList.remove('active');
        break;
      case 'high':
        this.high?.nativeElement.classList.remove('active');
    }
  }

  // Adds 'active' to current active state
  addActiveClassToState(state: string) {
    switch (state) {
      case 'open':
        this.open?.nativeElement.classList.add('active');
        break;
      case 'in-progress':
        this.inProgress?.nativeElement.classList.add('active');
        break;
      case 'done':
        this.done?.nativeElement.classList.add('active');
        break;
      case 'low':
        this.low?.nativeElement.classList.add('active');
        break;
      case 'medium':
        this.medium?.nativeElement.classList.add('active');
        break;
      case 'high':
        this.high?.nativeElement.classList.add('active');
        break;
    }
  }

  onCancelClick() {
    this.isEditState = false;
    this.setCss()
  }

  onEditSubmit() {

    this.bug = {
      ...this.bug,
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      priority: this.bug.priority,
      status: this.bug.status
    }

    API
      .put('BugsApi', `/bugs/${this.bug.id}`, {
        body: this.bug
      })
      .then(data => {
        this.bug = { ...this.bug, title: this.titleControl.value, description: this.descriptionControl.value, priority: this.priority, status: this.status }
        this.isEditState = false;
        window.location.href = ''
      })
      .catch(err => {
        console.log(err);
      })
  }
}
