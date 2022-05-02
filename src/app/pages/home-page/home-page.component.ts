import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { BugType } from 'src/types/bug.type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  bugs: BugType[] = []

  constructor() {
    API.get('BugsApi', '/bugs', {}).then(res => {
      this.bugs = res.data
      console.log(this.bugs[0]);
      this.bugs.sort((a: BugType, z: BugType) => {
        return a.created - z.created
      })
      this.bugs.map(bug => {
        bug.readableDate = new Date(bug.created).toDateString()
      })
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    window.location.href = ''
  }

  onBugDelete(bug: BugType) {
    API.del('BugsApi', `/bugs/${bug.id}`, {}).then(res => {
      console.log(res);
      this.bugs = this.bugs.filter(b => b.id !== bug.id)
    })
  }

}
