// src/app/components/navbar/navbar.ts

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 1. Import these

@Component({
  selector: 'app-navbar',
  standalone: true, // If this is true, do the following:
  imports: [RouterLink, RouterLinkActive], // 2. Add them to the imports array
  templateUrl: './navbar.html',
  // styleUrls: ...
})
export class NavbarComponent {
  toggleDark() {
    // This looks at your <html> tag and toggles the 'dark' class on and off
    document.documentElement.classList.toggle('dark');
  }
}
