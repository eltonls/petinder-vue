import type Pet from "@/models/pet.model";
import ImageRest from "@/services/rest/image.rest";
import PetRest from "@/services/rest/pet.rest";
import { Observable, Subject, take } from "rxjs";

export class PetRegisterService {
    constructor (
        private _petRest: PetRest = new PetRest(),
        private _imageRest: ImageRest = new ImageRest()
    ) {}
    
    private pet$: Subject<any> = new Subject();
    private image$: Subject<any> = new Subject();

    pet: Observable<any> = this.pet$.asObservable();
    image: Observable<any> = this.image$.asObservable();

    registerPet(pet: Pet): void {
        this._petRest
            .addPet(pet)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pet$.next(response);
                }
            })
    }
    addImage(image: File, name: string): void {
        this._imageRest
        .addImage(image,name)
        .pipe(take(1))
        .subscribe({
            next: (response) => {
                this.image$.next(response)
            }
        })
    }
    getImageURL(path: string): string {
        return this._imageRest.getFullUrl(path);
    }
}