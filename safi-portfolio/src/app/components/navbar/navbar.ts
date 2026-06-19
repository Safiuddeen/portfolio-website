import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Needed for *ngIf in your HTML
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // 2. Add CommonModule here
  templateUrl: './navbar.html',
  // styleUrls: ...
})
export class NavbarComponent {

  // Tracks whether the mobile dropdown is open or closed
  isMenuOpen = false;

  // Injects ElementRef so Angular knows exactly where this component lives on the screen
  constructor(private eRef: ElementRef) {}

  toggleDark() {
    // Toggles the 'dark' class on the root <html> tag
    document.documentElement.classList.toggle('dark');
  }

  // Flips the menu open or closed when the hamburger icon is clicked
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Forces the menu to close (used when a user clicks a link to navigate away)
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Listens to every click on the entire webpage
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    // If the user clicked somewhere that is NOT inside this Navbar Component, close the menu
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}
