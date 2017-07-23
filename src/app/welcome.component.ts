import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { fadeInUpAnimation } from './animations/index';

@Component({
  selector: 'welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [fadeInUpAnimation]
})
export class WelcomeComponent implements OnInit {
  // constructor() {}
  ngOnInit() {
  }
}
