import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";


class UserRest {
    loginWithPassword(email: string, password: string) {
        return fromPromise(supabase.auth.signInWithPassword({
            email,
            password
        }))
    }    

    signUp(email: string, password: string) {
        return fromPromise(supabase.auth.signUp({
            email,
            password
        }))
    }
}

export default UserRest;
