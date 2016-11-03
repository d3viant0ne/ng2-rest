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
