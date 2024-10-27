import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";
import User from "@/models/user.model";


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
     registerUser(user:User){
        return fromPromise(supabase.from('users').insert(user))
    }
    getUserById(id:string){
        return fromPromise(supabase.from('users').select().eq('auth_id',id))
    }
    updateUser(id:string,user:User){
        return fromPromise(supabase.from('users').update(user).eq('auth_id',id))
    }
}

export default UserRest;
