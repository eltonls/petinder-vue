import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";
import Pet, { AgeRange, Breed, GenderPet, PetStatus } from "@/models/pet.model";
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

  deletePet(pet: Pet): Observable<any> {
    pet.pet_status = PetStatus.INACTIVE;
    return fromPromise(supabase.from("pets").update(pet).eq("id", pet.id));
  }

  getRegisteredPetsByUser(userId: string) {
    let query = supabase.from("pets").select("").eq("user_id", userId).eq("pet_status", PetStatus.ACTIVE);
    return fromPromise(query);
  }

  getAdoptedPetsByOnwer(ownerId: string) {
    let query = supabase.from("pets").select("").eq("owner_id", ownerId).eq("pet_status", PetStatus.ACTIVE);
    return fromPromise(query);
  }
}

export default PetRest;
