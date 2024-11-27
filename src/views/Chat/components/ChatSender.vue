<template>
  <form class="relative w-full h-[155px]" @submit.prevent="sendMessage" >
    <Textarea
      class="w-full !bg-[#F1F1F1] border border-gray-200 !text-black h-full mt-2 !text-xl resize-none !pr-32 focus:!border-orange-500"
      v-model="message"
      no-resize
      @keydown.enter.prevent="sendMessage"
      placeholder="Digite sua mensagem"

    >
    </Textarea>
    <button
      class="bg-[#F3A04C] py-2 px-5 rounded text-black font-bold absolute right-5 bottom-3"
      type="submit"
    >
      Enviar
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    actualUserId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.message === "") return;
      this.$emit("sendMessage", this.message);
      this.message = "";
    },
  },
});
</script>

<style scoped></style>
