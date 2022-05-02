import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { API } from 'aws-amplify';
import { BugType } from 'src/types/bug.type';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {

  // Bug object
  bug: BugType = {
    id: "",
    title: '',
    description: '',
    status: 'open',
    priority: 'low',
    created: new Date(),
    readableDate: null
  }

  // Event for when form is submitted
  @Output() onSubmitEvent = new EventEmitter<BugType>();

  // ElementRefs for each state
  @ViewChild('open') open: ElementRef | null = null;
  @ViewChild('inProgress') inProgress: ElementRef | null = null;
  @ViewChild('done') done: ElementRef | null = null;
  @ViewChild('low') low: ElementRef | null = null;
  @ViewChild('medium') medium: ElementRef | null = null;
  @ViewChild('high') high: ElementRef | null = null;

  stateStatus = 'open'
  statePriority = 'low'

  titleControl: FormControl = new FormControl(this.bug?.title || "")
  descriptionControl: FormControl = new FormControl(this.bug?.description || "")

  errors = { title: '' };


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

  onSubmit() {
    this.errors.title = !this.titleControl.value ?
      this.errors.title = "Title is required" : "";
    if (this.errors.title) {
      return;
    }

    this.bug.title = this.titleControl.value;
    this.bug.description = this.descriptionControl.value;

    API.post('BugsApi', '/bugs', { body: { ...this.bug } }).then((res) => {
      console.dir(res);
      this.onSubmitEvent.emit(this.bug);
    })
  }



  constructor() { }

  ngOnInit(): void {
  }

}
