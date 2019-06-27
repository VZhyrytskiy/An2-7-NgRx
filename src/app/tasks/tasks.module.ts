import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent, TaskFormComponent, TaskListComponent } from './components';
import { TasksServicesModule } from './tasks-services.module';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [CommonModule, FormsModule, TasksRoutingModule, TasksServicesModule],
  providers: []
})
export class TasksModule {}
