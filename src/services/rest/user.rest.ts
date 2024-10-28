import { Observable } from 'rxjs';
import api from '../api-config/rxjs';
import type User from '@/models/user.model';

export class UserRest {
    getAllUsers(queryParams: any): Observable<any> {
        const url: string = "/users"
        return api.get(url, queryParams)
    }
    getUserById(id: string): Observable<any> {
        const url: string = "/users/${id}"
        return api.get(url)
    }
    registerUsers(user: User): Observable<any> {
        const url: string = "/users"
        return api.post(url, user)
    }
    updateUser(id: string, user: User): Observable<any> {
        const url: string = "/users/${id}"
        return api.put(url, user)
    }
    deleteUser(id: string): Observable<any> {
        const url: string = "/users/${id}"
        return api.deleteR(url)
    }
}
