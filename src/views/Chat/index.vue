<template>
  <main class="p-5 h-[900px] flex gap-2">
    <ChatList
      :chats="chats"
      :actualUserId="userId"
      @changeActualChat="changeActualChat"
    />
    <div class="w-4/5" v-if="actualChat.id !== undefined">
      <ChatMessages :messages="messages" :actualUserId="userId" :chat="actualChat" />
      <ChatSender @sendMessage="sendMessage" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import LocalStorageUtil from "@/utils/localStorage.util";
import ChatService from "./chat.service";
import { RealtimeChannel } from "@supabase/supabase-js";
import Chat from "@/models/chat.model";

const ChatList = defineAsyncComponent(
  () => import("./components/ChatList.vue")
);
const ChatMessages = defineAsyncComponent(
  () => import("./components/Chat.vue")
);
const ChatSender = defineAsyncComponent(
  () => import("./components/ChatSender.vue")
);

export default defineComponent({
  data() {
    return {
      messages: [] as Message[],
      userId: "",
      chatsWatcher: {} as RealtimeChannel,
      messagesWatcher: {} as RealtimeChannel,
      chats: [] as Array<Chat>,
      actualChat: {} as Chat,
    };
  },
  components: {
    ChatMessages,
    ChatSender,
    ChatList,
  },
  methods: {
    async changeActualChat(chat: Chat) {
      this.actualChat = chat;
      await this.loadChatMessages();
      this.subscribeToActualChatMessages();
    },
    async loadChatMessages() {
      const messages = await this.chatService.getAllMessages(
        this.actualChat.id
      );
      if (messages.status === 200) {
        console.log(messages);
        this.messages = messages.data as Message[];
      }
    },
    async sendMessage(message: string) {
      await this.chatService.sendMessage(
        this.actualChat.id,
        this.userId,
        message
      );
    },
    async initializeChats() {
      this.chats = await this.chatService.getAllChats(this.userId);
      this.actualChat = this.chats[0];
      this.subscribeToActualChatMessages();

      // Subscribe to chat changes
      this.chatsWatcher = this.chatService.subscribeToChatsChanges(
        this.userId,
        (updatedChats) => {
          console.log(updatedChats);
          this.chats = updatedChats;
        }
      );
    },
    subscribeToActualChatMessages() {
      // Unsubscribe previous watcher if exists
      if (this.messagesWatcher.unsubscribe) {
        this.messagesWatcher.unsubscribe();
      }

      // Subscribe to new chat messages
      this.messagesWatcher = this.chatService.subscribeToMessages(
        (newMessage) => {
          this.messages.push(newMessage);
        },
        this.actualChat.id
      );
    },
  },
  computed: {
    chatService(): ChatService {
      return new ChatService();
    },
    localStorage(): LocalStorageUtil<any> {
      return new LocalStorageUtil();
    },
  },
  async mounted() {
    const user = this.localStorage.getItem("user");
    this.userId = user.id;
    await this.initializeChats();
    await this.loadChatMessages();
  },
  unmounted() {
    this.chatsWatcher.unsubscribe();
    this.messagesWatcher.unsubscribe();
  },
});
</script>
