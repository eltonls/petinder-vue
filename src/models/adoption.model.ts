import type Pet from "./pet.model";
import type User from "./user.model";

export default class Adoption {
    constructor(
      public pet_id?: number ,
      public status?:Status,
      public id?: string,
      public user_id?: string,
      public created_at?: Date,
      public pets?:  Pet,
      public users?: User
    ) {}
  }

  export enum Status{
    PENDING="PENDING",
    APPROVED="APPROVED",
    NOT_APPROVED="NOT_APPROVED"
  }
  
  
  