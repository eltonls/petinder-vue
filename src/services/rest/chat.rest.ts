import supabase from "../api-config/setup";


class ChatRest {
  async getAllChats(userId: string) {
    // Pega as IDS do chat relacionado ao usuário
    const chatIds = await supabase
      .from('chats')
      .select('id, users:chats_users!inner(user_id)')
      .eq('users.user_id', userId)

    // Pega os chats com as ids antes salvas
    return await supabase
      .from("chats")
      .select("*, users:chats_users!inner(users:users(auth_id))")
      .in("id", [chatIds.data?.map((chat => chat.id))])
  }

}

export default ChatRest;
