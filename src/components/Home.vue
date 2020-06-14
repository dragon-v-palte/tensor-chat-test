<template>
  <div class="main">
    <ChatList />
    <div class="messages-person" v-if="getChatList.length">
      <Messages />
      <Person />
    </div>
  </div>
</template>

<script>
import Messages from "./Messages";
import Person from "./Person";
import ChatList from "./ChatList";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getChatList"])
  },
  components: {
    Person,
    Messages,
    ChatList
  }
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  height: 100vh;
  .messages-person {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    @media (min-width: 1024px) {
      flex-direction: row;
      width: 80%;
    }
  }
}
</style>
