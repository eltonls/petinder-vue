import PetRest from "@/services/rest/pet.service";
import { Observable, Subject } from "rxjs";


class TestService {
   constructor (private _petRest: PetRest = new PetRest()) {}

   private pets$: Subject<any> = new Subject<any>();
    pets: Observable<any> = this.pets$.asObservable();

    getPetById(id: string): void {
        this._petRest.getPetById(id).subscribe((pets) => {
            this.pets$.next(pets);
        });
    }

    getAllpets(): void {
        this._petRest.getAllPets().subscribe((pets) => {
            this.pets$.next(pets);
        });
    }
}

export default TestService;