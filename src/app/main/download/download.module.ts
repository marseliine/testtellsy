import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadPageComponent } from './pages/download-page/download-page.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DownloadPageComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [DownloadPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DownloadModule {}
