import type User from "@/models/user.model";
import UserRest from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";

export default class AccountService {
  constructor(private _userRest = new UserRest()) {}
  private user$: Subject<any> = new Subject<any>();
  user: Observable<any> = this.user$.asObservable();
  registerUser(user: User) {
    this._userRest
      .registerUser(user)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.user$.next(response);
        },
      });
  }
  getUserById(id: string) {
    this._userRest
      .getUserById(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.user$.next(response);
        },
      });
  }
  updateUser(id: string, user: User) {
    this._userRest
      .updateUser(id, user)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.user$.next(response);
        },
      });
  }
}
