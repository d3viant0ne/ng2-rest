import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RESTClient} from './rest.service';

@NgModule({
  declarations: [],
  imports: [HttpModule],
  exports: [HttpModule],
  providers: [RESTClient]
})
export class RESTModule {}
