export default class User{
    constructor(
        public createdAt: Date,
        public name: string = '',
        public city: string = '',
        public telephone: string = '',
        public id: string = ''
    ){}
}