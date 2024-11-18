
import AdoptionRest from "@/services/rest/adoption.rest";
import UserRest from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";

export class NavbarService {
  constructor(
    private _AdoptionRest = new AdoptionRest(),
    private _UserRest =  new UserRest()
  ) {}

  private adoptions$: Subject<any> = new Subject<any>();
  private user$: Subject<any> = new Subject<any>();

  adoptions: Observable<any> = this.adoptions$.asObservable();
  user: Observable<any> = this.user$.asObservable();


  getAllAdoptionsRequest(id:string): void{
  this._AdoptionRest.getAllAdoptionsRequests(id).pipe().subscribe({
    next:(response)=>{
      this.adoptions$.next(response)
    }
  })
  }
  getUserById(id:string): void{
    this._UserRest.getUserById(id).pipe(take(1)).subscribe({
      next:(response)=>{
        this.user$.next(response)
      }
    })
  }
}
