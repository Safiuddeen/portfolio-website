import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Required for *ngIf and dynamic classes

@Component({
  selector: 'app-projects',
  standalone: true, // Ensure this is explicitly set for modern Angular
  imports: [CommonModule], // 2. Inject CommonModule here
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  // Sets the default view when the page first loads
  activeFilter: string = 'All';

  // This method is triggered every time a filter button is clicked
  setFilter(category: string) {
    this.activeFilter = category;
  }

}
