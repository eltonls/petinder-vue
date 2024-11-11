<template>
  <div
    class="w-full flex flex-col h-[700px] bg-slate-100 rounded overflow-hidden"
  >
    <header class="w-full bg-[#585ABF] text-white p-5 flex justify-between items-center">
      <p class="text-right" v-if="chat.users">
        {{ chat.users[0].userInfo.username }}
      </p>
      <button class="px-5 py-1 rounded text-white font-bold border border-white">Aceitar Adoção!</button>
    </header>
    <div
      class="w-full flex flex-col h-[700px] bg-gray-100 rounded p-6 mb-2 overflow-y-scroll chat border"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="p-2 text-black rounded-lg my-1 flex flex-col message"
        :class="
          message.author_id !== actualUserId
            ? 'self-start bg-slate-300'
            : 'self-end bg-[#F3A04C]'
        "
      >
        <span class="block">
          {{ message.text }}
        </span>
        <span
          class="block text-xs text-gray-600"
          :class="
            message.author_id !== actualUserId
              ? 'self-start bg-slate-300'
              : 'self-end'
          "
        >
          {{ formatDate(message.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type Prop, type PropType } from "vue";
import moment from "moment";
import type Chat from "@/models/chat.model";

export default defineComponent({
  props: {
    chat: {
      type: {} as PropType<Chat>,
      default: {},
    },
    messages: {
      type: [] as PropType<Array<Message>>,
      default: [],
    },
    actualUserId: {
      type: String,
      default: "",
    },
  },
  methods: {
    formatDate(date: Date) {
        if(moment(date).isBefore(new Date())) {
            return moment(date).format("DD/MM/YYYY HH:mm");
        } else {
            return moment(date).format("HH:mm");
        }
    },
    moveToBottomOfChat() {
      const chat = document.querySelector(".chat");
      chat?.scrollTo(0, chat.scrollHeight);
    },
  },
  updated() {
    this.moveToBottomOfChat();
  },
  mounted() {
    this.moveToBottomOfChat();
  },
});
</script>

<style scoped>
.message {
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 100% 100%, 70% 91%, 0 90%);
}
</style>
