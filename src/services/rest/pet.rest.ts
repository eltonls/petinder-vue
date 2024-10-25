import type { Observable } from 'rxjs'
import api from "../api-config/rxjs";
import type Pet from '@/models/pet.model'
export class PetRest {

    
    getAllPets(): Observable<any> {
        const url :string = `/pets`
        return api.get(url)
    }
    getPetById(id:number) : Observable<any> {
        const url:string = `/${id}`
        return api.get(url)
    }
    registerPet(pet:Pet): Observable<any>{
        const url:string = `/`
        return api.post(url,pet)
    }
    updatePet(pet:Pet): Observable<any>{
        const url:string = `/`
        return api.put(url,pet)
    }
    deletePet(id:number): Observable<any>{
        const url:string = `/${id}`
        return api.deleteR(url)
    }
}