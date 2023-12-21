import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputMainComponent } from '../pages/input-main/input-main.component';
import { TableMainComponent } from '../pages/table-main/table-main.component';
import { TableDataService } from '../profile/services/table-data.service';
import { AddPersonComponent } from '../pages/add-person/add-person.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [UsersPageComponent,InputMainComponent, TableMainComponent, AddPersonComponent,AddPersonComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NzModalModule, FormsModule, NzFormModule, NzSelectModule],
  providers: [TableDataService],
})
export class UsersModule {}
