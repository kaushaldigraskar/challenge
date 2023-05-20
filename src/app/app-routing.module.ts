import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablelistComponent } from './tablelist/tablelist.component';

const routes: Routes = [
  {
    path: 'party',
    component: TablelistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
