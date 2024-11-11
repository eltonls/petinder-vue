class Message {
    constructor(
        public id: string,
        public createdAt: Date,
        public chat_id: string,
        public author_id: string,
        public text: string
    ) {}
}