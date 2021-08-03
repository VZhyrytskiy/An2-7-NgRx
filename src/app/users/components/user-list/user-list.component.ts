import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserObservableService } from './../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;

  private editedUser!: UserModel;

  constructor(
    private userObservableService: UserObservableService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.users$ = this.userObservableService.getUsers();

    // listen editedUserID from UserFormComponent
    const observer = {
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.has('editedUserID')
            ? this.userObservableService.getUser(params.get('editedUserID')!)
            : EMPTY;
        })
      )
      .subscribe(observer);
  }

  onEditUser(user: UserModel): void {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: UserModel): void {
    this.users$ = this.userObservableService.deleteUser(user);
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }
}
