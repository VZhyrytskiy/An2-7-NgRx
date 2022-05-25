import { Component, type OnInit  } from '@angular/core';
import { ActivatedRoute, Router, type Data, type UrlTree } from '@angular/router';
import { Location } from '@angular/common';
import { type Observable, type Subscription, map } from 'rxjs';

import { AutoUnsubscribe, DialogService, type CanComponentDeactivate } from './../../../core';
import { UserObservableService } from './../../services';
import { type UserModel } from './../../models/user.model';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;

  private sub!: Subscription;

  constructor(
    private userObservableService: UserObservableService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.route.data.pipe(map((data: Data) => data['user'])).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });
  }

  onSaveUser(): void {
    const user = { ...this.user };

    const method = user.id ? 'updateUser' : 'createUser';
    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = { ...savedUser };
        user.id
          ? // optional parameter: http://localhost:4200/users;editedUserID=2
            this.router.navigate(['users', { editedUserID: user.id }])
          : this.onGoBack();
      },
      error: (err: any) => console.log(err)
    };
    this.sub = this.userObservableService[method](user).subscribe(observer);
  }

  onGoBack(): void {
    this.location.back();
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const flags = (Object.keys(this.originalUser) as (keyof UserModel)[]).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
