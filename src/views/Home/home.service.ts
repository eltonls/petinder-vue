import { PetRest } from "@/services/rest/pet.rest";
import { BehaviorSubject, Observable } from "rxjs";

export class HomeService{
    constructor(
        private _petRest = new PetRest()
    ){}
    private pets$ : BehaviorSubject<any> = new BehaviorSubject<any>([])

    pets: Observable<any> =this.pets$.asObservable()


    getAllPets(): void{
        this._petRest.getAllPets().pipe().subscribe({
            next:(response)=>{
                this.pets$.next(response)  
                console.log(response, "kdhfh");
                    
            }
        })
    }
}