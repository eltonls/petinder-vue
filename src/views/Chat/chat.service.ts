import supabase from '@/services/api-config/setup';
import Chat from '@/models/chat.model';
import { RealtimeChannel } from '@supabase/supabase-js';

export default class ChatService {
  async getAllChats(userId: string): Promise<Array<Chat>> {
    const chatIds = await supabase
      .from('chats')
      .select('id, users:chats_users!inner(user_id)')
      .eq('users.user_id', userId);

    const chatsRes = await supabase
      .from("chats")
      .select("*, users:chats_users(*, userInfo:users(*))")
      .neq("users.user_id", userId)
      .in("id", chatIds.data?.map((chat => chat.id)) || [])

    return chatsRes.data as Array<Chat>;
  }

  async getAllMessages(chatId: string) {
    console.log("Alo", chatId);
    return await supabase.from("messages").select("*").eq("chat_id", chatId);
  }

  async sendMessage(chatId: string, userId: string, message: string) {
    return await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        author_id: userId,
        text: message
      });
  }

  subscribeToChatsChanges(
    userId: string, 
    updateChatsCallback: (chats: Array<Chat>) => void
  ): RealtimeChannel {
    return supabase.channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        async () => { 
          const chats = await this.getAllChats(userId);
          updateChatsCallback(chats);
        }
      )
      .subscribe();
  }

  subscribeToMessages(
    addMessageCallback: (message: any) => void,
    chatId: string
  ): RealtimeChannel {
    return supabase.channel("chat-channel")
      .on(
        `postgres_changes`,
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          if(payload.new && payload.new.chat_id === chatId) {
            addMessageCallback(payload.new);
          }
        }
      ).subscribe();
  }
}
