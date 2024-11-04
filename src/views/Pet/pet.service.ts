import type { AgeRange, Breed, GenderPet } from "@/models/pet.model";
import type Pet from "@/models/pet.model";
import PetRest from "@/services/rest/pet.rest";
import { Observable, Subject, take } from "rxjs";

export class PetService {
  constructor(private _petRest = new PetRest()) {};
  
  private pets$: Subject<any> = new Subject<any>();
  
  pets: Observable<any> = this.pets$.asObservable();
  
  
  getPets(gender?: GenderPet, ageRange?: AgeRange, breed?: Breed): void {
    this._petRest
    .getPets(gender, ageRange, breed)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.pets$.next(response)
      }
    })
  }

  addPet(pet: Pet): void {
    this._petRest
    .addPet(pet)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.pets$.next(response)
      }
    })
  }

  updatePet(pet: Pet): void {
    this._petRest
    .updatePet(pet)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.pets$.next(response)
      }
    })
  }

  deletePet(id: number): void {
    this._petRest
    .deletePet(id)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.pets$.next(response)
      }
    })
  }
}
