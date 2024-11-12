import type Pet from "@/models/pet.model";
import ImageRest from "@/services/rest/image.rest";
import PetRest from "@/services/rest/pet.rest";
import { Observable, Subject, take } from "rxjs";

export class UpdatePetService {
    constructor(
        private _petRest: PetRest = new PetRest(),
        private _imageRest: ImageRest = new ImageRest()
    ) {}

    private pets$: Subject<any> = new Subject<any>();
    private images$: Subject<any> = new Subject<any>();

    pets: Observable<any> = this.pets$.asObservable();
    images: Observable<any> = this.images$.asObservable();

    getPetById(id: string): void {
        this._petRest
        .getPetById(id)
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

    addImage(image: File, name: string) {
        this._imageRest
        .addImage(image,name)
        .pipe(take(1))
        .subscribe({
            next: (response) => {
                this.images$.next(response)
            }
        })
    }

    deleteImage(name: string) {
        this._imageRest
        .deleteImage(name)
        .pipe(take(1))
        .subscribe({
            next: (response) => {
                this.images$.next(response)
            }
        })
    }

    getFullUrl(path: string): string {
        return this._imageRest.getFullUrl(path);
    }
}