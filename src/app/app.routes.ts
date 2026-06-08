import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { About } from './pages/about/about';
import { Qualifications } from './pages/qualifications/qualifications';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'qualifications', component: Qualifications },

  { path: '**', redirectTo: '' }
];
