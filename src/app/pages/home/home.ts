import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // Required for your buttons to work!
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,           // Added to match our modern architecture
  imports: [RouterLink],      // Added to fix your navigation buttons
  templateUrl: './home.html',
  // styleUrls: ['./home.css'] // Keep this uncommented if you are using a separate CSS file
})
export class HomeComponent implements OnInit, AfterViewInit {

  greeting: string = '';

  ngOnInit(): void {
    const hour = new Date().getHours();

    // Dynamically sets the greeting based on the user's local time
    if (hour < 12) {
      this.greeting = '☀️ Good Morning';
    } else if (hour < 17) {
      this.greeting = '🌤️ Good Afternoon';
    } else {
      this.greeting = '🌙 Good Evening';
    }
  }

  ngAfterViewInit(): void {
    new Typed('#typed', {
      strings: [
        'Creative Developer.',
        'Full Stack Developer.',
        'Flutter Mobile App Developer.',
        'AI Application Developer.'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: '|' // A standard pipe character usually looks best for a cursor!
    });
  }
}
