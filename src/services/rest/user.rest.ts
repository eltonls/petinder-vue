import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";
import User from "@/models/user.model";
import type { Observable } from "rxjs";

class UserRest {
  loginWithPassword(email: string, password: string): Observable<any> {
    return fromPromise(
      supabase.auth.signInWithPassword({
        email,
        password,
      })
    );
  }

  signUp(email: string, password: string): Observable<any> {
    return fromPromise(
      supabase.auth.signUp({
        email,
        password,
      })
    );
  }
  registerUser(user: User): Observable<any> {
    return fromPromise(supabase.from("users").insert(user));
  }
  getUserById(id: string): Observable<any> {
    return fromPromise(supabase.from("users").select().eq("auth_id", id));
  }
  updateUser(id: string, user: User): Observable<any> {
    return fromPromise(supabase.from("users").update(user).eq("auth_id", id));
  }
}

export default UserRest;
