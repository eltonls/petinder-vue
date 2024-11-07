export default class Pet{
    constructor(
        public name?: string,
        public breed?: Breed,
        public age?: AgeRange,
        public description?: string ,
        public gender?: GenderPet,
        public image_url?: string,
        public created_at: Date = new Date,
        public id?: number,
        public owner_id?: string,
        public user_id?: string,
        public pet_status?: PetStatus
    ){}
}

export enum GenderPet {
    Female = "Fêmea",
    Male = "Macho"
}

export enum AgeRange {
    Young = "Jovem",
    Adult = "Adulto",
    Old = "Idoso"
}

export enum Breed {
    Dogs = "Cães",
    Cats = "Gatos",
    Rodents = "Roedores e coelhos", 
    Birds = "Pássaros",
    Lizards = "Lagartos",
    Turtles = "Tartarugas",
    Frogs = "Sapos e rãs",
    Fish = "Peixes",
    Insects = "Insetos",
    Arachnids = "Aracnídeos",
    Others = "Outros"
}

export enum PetStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}