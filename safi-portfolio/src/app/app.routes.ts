import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { About } from './pages/about/about';
import { Qualifications } from './pages/qualifications/qualifications';
import { Experience } from './pages/experience/experience';
import { Projects } from './pages/projects/projects';
import { NavbarComponent } from './components/navbar/navbar';
import { Skills } from './pages/skills/skills';
import { Contact } from './pages/contact/contact';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'qualifications', component: Qualifications },
  { path: 'experience', component: Experience },
  { path: 'projects', component: Projects },
  { path: 'navbar', component: NavbarComponent },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },

  { path: '**', redirectTo: '' }
];
