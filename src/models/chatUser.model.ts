import type User from "./user.model";

class ChatUser {
  constructor(
    public id: string,
    public chatId: string,
    public userId: string,
    public createdAt: string,
    public userInfo: User
  ) { }
}

export default ChatUser;
