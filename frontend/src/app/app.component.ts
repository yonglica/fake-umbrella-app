import {Component, NgModule} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'frontend';

  constructor(
    private IconRegisterService: MatIconRegistry,
    private DomSanitizer: DomSanitizer,
  ) {
  }

}
