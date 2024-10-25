import type { Observable } from "rxjs";
import api from "../api-config/rxjs";

class PetRest {
  getAllPets(): Observable<any> {
    return api.get("/pets");
  }
}

export default PetRest;
