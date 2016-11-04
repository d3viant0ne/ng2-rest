import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RESTClient} from './rest.service';
export {
  RESTClient,
  BaseUrl,
  DefaultHeaders,
  GET,
  POST,
  PUT,
  DELETE,
  HEAD,
  Headers,
  Path,
  Body,
  Query,
  Produces,
  MediaType
} from './rest.service';

@NgModule({
  declarations: [],
  imports: [HttpModule],
  exports: [HttpModule],
  providers: [RESTClient]
})
export class RESTModule {}
