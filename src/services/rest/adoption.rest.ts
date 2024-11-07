import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";
import type Adoption from "@/models/adoption.model";
import type { Observable } from "rxjs";

export default class AdoptionRest {
  getAllMyAdoptions(id: string): Observable<any> {
    return fromPromise(
      supabase
        .from("adoption")
        .select(
          "id,pets!inner(id,name,description, image_url,user_id),users!inner(username,adress,phone,auth_id), created_at,status"
        )
        .eq("user_id", id)
    );
  }
  registerAdoption(adoption: Adoption): Observable<any> {
    return fromPromise(supabase.from("adoption").insert(adoption));
  }
  updateStatus(adoption: Adoption): Observable<any> {
    return fromPromise(
      supabase.from("adoption").update(adoption).eq("id", adoption.id)
    );
  }
  deleteAdoption(id: string): Observable<any> {
    return fromPromise(supabase.from("adoption").delete().eq("id", id));
  }
  getAdoptionById(user_id: string,pet_id:number): Observable<any> {
    return fromPromise(
      supabase
        .from("adoption")
        .select(
          "pets!inner(id,name,description, image_url,user_id),users!inner(username,adress,phone,auth_id), created_at,status"
        )
        .eq("user_id",user_id).eq('pet_id',pet_id)
    );
  }
}
