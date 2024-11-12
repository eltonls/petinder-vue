import type { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import supabase from "../api-config/setup";

class ImageRest {
    addImage(image: File, name: string, error?: Error): Observable<any> {
        if (error) {
            console.log(error)
        };
        return fromPromise(supabase.storage.from('pet-images').upload(name, image))
    }
    deleteImage(name: string): Observable<any> {
        return fromPromise(supabase.storage.from('pet-images').remove([name]))
    }
    getFullUrl(name: string): string {
        const { publicUrl } = supabase.storage.from('pet-images').getPublicUrl(name).data;
        return publicUrl;
    }
}

export default ImageRest;