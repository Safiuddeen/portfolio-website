// src/app/pages/home/home.ts

import { Component, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    new Typed('#typed', {
      strings: [
        'Creative Developer',
        'Full Stack Developer',
        'Flutter Mobile App Developer',
        'AI Application Developer'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: ''
    });
  }
}
