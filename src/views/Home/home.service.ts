import type Adoption from "@/models/adoption.model";
import type { AgeRange, Breed, GenderPet } from "@/models/pet.model";
import type Pet from "@/models/pet.model";
import AdoptionRest from "@/services/rest/adoption.rest";
import PetRest from "@/services/rest/pet.rest";
import UserRest from "@/services/rest/user.rest";
import { Observable, Subject, take } from "rxjs";

export class HomeService {
  private _userRest = new UserRest();
  constructor(
    private _petRest = new PetRest(),
    private _AdoptionRest = new AdoptionRest()
  ) {}

  private pets$: Subject<any> = new Subject<any>();
  private user$: Subject<any> = new Subject<any>();
  private adoption$: Subject<any> = new Subject<any>();
  adoption: Observable<any> = this.adoption$.asObservable();
  user: Observable<any> = this.user$.asObservable();

  pets: Observable<any> = this.pets$.asObservable();

  getPets(gender?: GenderPet, ageRange?: AgeRange, breed?: Breed): void {
    this._petRest
      .getPets(gender, ageRange, breed)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.pets$.next(response);
        },
      });
  }

  addPet(pet: Pet): void {
    this._petRest
      .addPet(pet)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.pets$.next(response);
        },
      });
  }

  updatePet(pet: Pet): void {
    this._petRest
      .updatePet(pet)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.pets$.next(response);
        },
      });
  }

  deletePet(id: number): void {
    this._petRest
      .deletePet(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.pets$.next(response);
        },
      });
  }
  registerAdoption(adoption: Adoption): void {
    this._AdoptionRest
      .registerAdoption(adoption)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.adoption$.next(response);
        },
      });
  }
  getAdoptionById(userId: string, petId: number): void {
    this._AdoptionRest
      .getAdoptionById(userId, petId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.adoption$.next(response);
        },
      });
  }
  getUserById(id: string): void {
    this._userRest
      .getUserById(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.user$.next(response);
        },
      });
  }
}
