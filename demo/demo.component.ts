import {Component, Input} from '@angular/core';
import {DemoService, Post} from './demo.service';

@Component({
  selector: 'demo-app',
  template: `
    <table>
      <thead>
        <tr><th>#</th><th>User</th><th>Title</th><th>Body</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of demoList">
          <th>{{item.id}}</th>
          <th>{{item.userId}}</th>
          <th>{{item.title}}</th>
          <th>{{item.body}}</th>
        </tr>
      </tbody>
    </table>
  `
})
export class Demo {
  @Input() public demoPost: Post = new Post(1, 'Demo Title', 'Demo Body');
  @Input() public demoList: Post[] = [];
  @Input() public error: String;

  constructor(public demoService: DemoService) {
    this.getPosts();
  }

  getPosts() {
    delete this.error;
    this.demoService.getPosts().subscribe(res => {
      // if (res.ok) {
        this.demoList = res;
      // } else {
      //   this.error = 'Failed to retrieve demo posts';
      // }
    });
  }

  createPost() {
    this.demoService.createPost(this.demoPost);
  }
}
