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
}