<template>
  <div class="w-1/5 rounded max-h-[800px]">
    <header class="bg-purple p-6 text-white rounded-t">
      <h2 class="font-bold text-left">Chats</h2>
    </header>
    <div
      class="text-black max-w-sm rounded h-full w-full border border-gray-300 bg-gray-100 overflow-y-scroll"
    >
      <div :v-if="chats" v-for="chat in chats" :key="chat.id" class="transition-all hover:-translate-y-[2px]">
        <button
          class="w-full h-full text-left flex p-4 border-b-2 border-b-slate-200"
          @click="changeActualChat(chat)"
        >
          <img
            src="@/assets/images/empty.png"
            alt=""
            class="w-9 h-9 rounded-full"
          />
          <p class="p-2">{{ chat.users[0].userInfo.username }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Chat from "@/models/chat.model";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    chats: {
      type: Array<Chat>,
      default: [],
    },
    actualUserId: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeActualChat(chat: Chat) {
      this.$emit("changeActualChat", chat);
    },
  },
});
</script>
