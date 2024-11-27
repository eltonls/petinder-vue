import type ChatUser from "./chatUser.model";
import type User from "./user.model";

class Chat {
  constructor(
    public id: string,
    public createdAt: string,
    public users: Array<ChatUser>,
  ) {}
}

export default Chat;
