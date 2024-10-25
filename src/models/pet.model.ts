<<<<<<< HEAD
export default class Pet{
    constructor(
        public name: string = '',
        public breed: string = '',
        public age: number,
        public description: string ,
        public gender: string,
        public imageCat: string,
        public id: string
    ){}
=======


class Pet {
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
        public breed?: string,
        public weight?: number,
        public ownerId?: number
    ) {}
>>>>>>> e52b306 ((feature) [Frontend] added axios and rxjs config)
}