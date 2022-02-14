import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import type { UserModel } from './../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user!: UserModel;

  @Output() editUser = new EventEmitter<UserModel>();
  @Output() deleteUser = new EventEmitter<UserModel>();

  onEditUser(): void {
    this.editUser.emit(this.user);
  }

  onDeleteUser(): void {
    this.deleteUser.emit(this.user);
  }
}
