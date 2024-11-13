import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";
import Pet, { AgeRange, Breed, GenderPet } from "@/models/pet.model";
import type { Observable } from "rxjs";

class PetRest {
  getPets(
    gender?: GenderPet,
    ageRange?: AgeRange,
    breed?: Breed
  ): Observable<any> {
    let query = supabase.from("pets").select("").is("owner_id", null);

    if (gender) {
      query = query.eq("gender", gender);
    }

    if (ageRange) {
      query = query.eq("age", ageRange);
    }

    if (breed) {
      query = query.eq("breed", breed);
    }

    return fromPromise(query);
  }

  addPet(pet: Pet): Observable<any> {
    return fromPromise(supabase.from("pets").insert(pet));
  }

  updatePet(pet: Pet): Observable<any> {
    return fromPromise(supabase.from("pets").update(pet).eq("id", pet.id));
  }

  deletePet(id: number): Observable<any> {
    return fromPromise(supabase.from("pets").delete().eq("id", id));
  }
}

export default PetRest;
