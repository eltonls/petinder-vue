import type Adoption from "@/models/adoption.model";
import AdoptionRest from "@/services/rest/adoption.rest";
import { Observable, Subject, take } from "rxjs";

export class AdoptionService {
  constructor(private _AdoptionRest = new AdoptionRest()) {}

  private adoptions$: Subject<any> = new Subject<any>();
  private adoption$: Subject<any> = new Subject<any>();

  adoptions: Observable<any> = this.adoptions$.asObservable();
  adoption: Observable<any> = this.adoption$.asObservable();

  getAllMyAdoptions(id: string): void {
    this._AdoptionRest
      .getAllMyAdoptions(id)
      .pipe()
      .subscribe({
        next: (response) => {
          this.adoptions$.next(response);
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
  updateStatusAdoption(adoption: Adoption): void {
    this._AdoptionRest
      .updateStatus(adoption)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.adoption$.next(response);
        },
      });
  }
  getAdoptionById(userId: string,petId:number): void {
    this._AdoptionRest
      .getAdoptionById(userId,petId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.adoption$.next(response);
        },
      });
  }
  deleteAdoption(id: string): void {
    this._AdoptionRest
      .deleteAdoption(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.adoption$.next(response);
        },
      });
  }
}
