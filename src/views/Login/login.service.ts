import { UserRest } from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";


class LoginService {
  constructor(private _userRest: UserRest = new UserRest()) {}

  private user$: Subject<any> = new Subject<any>()

  user: Observable<any> = this.user$.asObservable();

  getUserById(id: string) {
    this._userRest.getUserById(id).pipe().subscribe({
      next: (response) => {
        this.user$.next(response)
      }
    })
  }

  getUserByEmail(email: string) {
    this._userRest.getAllUsers({ email }).pipe(take(1)).subscribe({
      next: (response) => {
        this.user$.next(response)
      }
    })
  }
}

export default LoginService;