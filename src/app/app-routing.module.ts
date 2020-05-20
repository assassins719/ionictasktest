import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasklist',
    loadChildren: () => import('./components/tasklist/tasklist.module').then( m => m.TasklistPageModule)
  },
  {
    path: 'taskdetail',
    loadChildren: () => import('./components/taskdetail/taskdetail.module').then( m => m.TaskdetailPageModule)
  },
  {
    path: '',
    redirectTo: 'tasklist',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
