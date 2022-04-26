import { Component, OnInit } from '@angular/core';
import { BugType } from 'src/types/bug.type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  dummyData: BugType[] = [
    {
      id: "1",
      title: 'Bug 1',
      description: 'Bug 1 description',
      status: 'open',
      severity: 'low',
      created: new Date()
    },
    {
      id: "2",
      title: 'Bug 2',
      description: 'Bug 2 description',
      status: 'in-progress',
      severity: 'medium',
      created: new Date()
    },
    {
      id: "3",
      title: 'Bug 3',
      description: 'Bug 3 description',
      status: 'done',
      severity: 'high',
      created: new Date()
    }
  ]
  bugs: BugType[] = this.dummyData

  constructor() { }

  ngOnInit(): void {
  }

  onBugDelete(bug: BugType) {
    console.log(bug);

  }

}
