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
      if (ageRange == AgeRange.Young) {
        query = query.gte("age", [0]).lte("age", [3]);
      } else if (ageRange == AgeRange.Adult) {
        query = query.gte("age", [4]).lte("age", [6]);
      } else {
        query = query.gte("age", [7]).lte("age", [100]);
      }
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
