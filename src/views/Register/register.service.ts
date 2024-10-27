import type User from "@/models/user.model";
import UserRest from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";

export default class RegisterService {
  constructor(private _userRest = new UserRest()) {}
  private user$: Subject<any> = new Subject<any>();
  user: Observable<any> = this.user$.asObservable();

  signUp(email: string, password: string): void {
    this._userRest
      .signUp(email, password)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.user$.next(response);
        },
      });
  }
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
}
