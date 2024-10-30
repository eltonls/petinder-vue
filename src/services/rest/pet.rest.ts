import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import supabase from '../api-config/setup'
export class PetRest {

    getAllPets() {
        return fromPromise(supabase.from('pets').select())
    }
}