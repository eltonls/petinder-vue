import UserRest from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";

class LoginService {
  constructor(private _userRest: UserRest = new UserRest()) {}

  private user$: Subject<any> = new Subject<any>();

  user: Observable<any> = this.user$.asObservable();

  login(email: string, password: string): void {
    this._userRest
      .loginWithPassword(email, password)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.user$.next(response);
        },
      });
  }

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
}

export default LoginService;
