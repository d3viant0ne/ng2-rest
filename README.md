# ng2-http-wrapper
<!-- [![Build Status](https://travis-ci.org/hboylan/ng2-rest.svg?branch=master)](https://travis-ci.org/hboylan/ng2-rest) -->
[![npm version](https://badge.fury.io/js/ng2-rest.svg)](http://badge.fury.io/js/ng2-rest)
<!-- [![devDependency Status](https://david-dm.org/hboylan/ng2-rest/dev-status.svg)](https://david-dm.org/hboylan/ng2-rest#info=devDependencies) -->
[![GitHub issues](https://img.shields.io/github/issues/hboylan/ng2-rest.svg)](https://github.com/hboylan/ng2-rest/issues)
[![GitHub stars](https://img.shields.io/github/stars/hboylan/ng2-rest.svg)](https://github.com/hboylan/ng2-rest/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hboylan/ng2-rest/master/LICENSE)

## Demo
https://hboylan.github.io/ng2-rest/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

Angular2 HTTP wrapper for REST client services

## Installation

Install through npm:
```
npm install --save ng2-http-wrapper
```

Then use it in your app like so:

```typescript
// demo.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RESTModule} from '../src';
import {Demo} from './demo.component';
import {DemoService} from './demo.service';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, RESTModule],
  bootstrap: [Demo],
  providers: [DemoService]
})
export class DemoModule {}
```

```typescript
// demo.service.ts
import {Injectable} from '@angular/core';
import {Http, Request, Response} from '@angular/http';
import {RESTClient, BaseUrl, DefaultHeaders, GET, POST, Body, Query, Produces, MediaType} from '../src/rest.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
@BaseUrl('http://jsonplaceholder.typicode.com')
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class DemoService extends RESTClient {

  constructor(protected http: Http) {super(http)}

  protected requestInterceptor(req: Request) {}

  protected responseInterceptor(res: Observable<Response>): Observable<Response> {
    return res
  }

  @POST('/posts')
  public createPost(@Body post: Post): Observable<Response> {
    return null;
  }

  @GET('/posts')
  @Produces<Post[]>(res => <Post[]>res.json())
  public getPosts(@Query('userId') userId?: number): Observable<Post[]> {
    return null;
  }
}

export class Post {

  constructor(
    public userId: number,
    public title: string,
    public body: string,
    public id?: number
  ) {}
}
```

```typescript
// demo.component.ts
@Component(...)
export class Demo {
  @Input() public demoPost: Post = new Post(1, 'Demo Title', 'Demo Body');
  @Input() public demoList: Post[] = [];

  constructor(public demoService: DemoService) {
    this.getPosts();
  }

  createPost() {
    this.demoService.createPost(this.demoPost);
  }

  getPosts() {
    this.demoService.getPosts().subscribe(res => {
      this.demoList = res;
    });
  }
}
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://hboylan.github.io/ng2-rest/docs/

---

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
