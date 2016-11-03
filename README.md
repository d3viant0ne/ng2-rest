# ng2-rest
[![Build Status](https://travis-ci.org/hboylan/ng2-rest.svg?branch=master)](https://travis-ci.org/hboylan/ng2-rest)
[![npm version](https://badge.fury.io/js/ng2-rest.svg)](http://badge.fury.io/js/ng2-rest)
[![devDependency Status](https://david-dm.org/hboylan/ng2-rest/dev-status.svg)](https://david-dm.org/hboylan/ng2-rest#info=devDependencies)
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
npm install --save ng2-rest
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {HelloWorld} from 'ng2-rest';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/hboylan/ng2-rest/blob/master/demo/demo.ts).

### Usage without a module bundler
```
<script src="node_modules/dist/umd/ng2-rest/ng2-rest.js"></script>
<script>
    // everything is exported RESTClient namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://hboylan.github.io/ng2-rest/docs/

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
