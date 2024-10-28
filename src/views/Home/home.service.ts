import { PetRest } from "@/services/rest/pet.rest";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class HomeService {
  constructor(
    private _petRest = new PetRest()
  ) { }
  private pets$: Subject<any> = new Subject<any>();

  pets: Observable<any> = this.pets$.asObservable()

  getAllPets(): void {
    this._petRest.getAllPets().pipe().subscribe({
      next: (response) => {
        this.pets$.next(response)
      }
    })
  }
}
