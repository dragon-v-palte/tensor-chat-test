<template>
  <div class="chat-list">
    <div class="chat-list__options options">
      <button class="options__new-chat" @click="showNewChat">
        <img src="../../public/icons/new-chat.png" />
      </button>
    </div>
    <div class="chat-list__empty" v-if="!getChatList.length">
      <h3>No messages...</h3>
      <p>
        Click the button
        <br />to start a new chat
      </p>
    </div>
    <div v-else class="chat-list__container">
      <transition-group name="chat-list" tag="div" class="chat-list__overlay">
        <div
          v-for="chat in getChatList"
          v-bind:key="chat.id"
          class="chat-list__chat-user chat-user"
          @click="selectUser(chat.id)"
          :class="chat.id == selectedUserId ? 'selected' : ''"
        >
          <img class="chat-user__photo" :src="require(`../../public/persons/${chat.photo}`)" />
          <div class="chat-user__title">
            <span class="chat-user__name">{{ chat.name }}</span>
            <div class="chat-user__subtitle">
              <span class="chat-user__last-message">{{ chat.lastMessage }}</span>
              <span
                class="chat-user__time-message"
              >{{ new Date(chat.time).toLocaleString('ru', { hour: 'numeric', minute: 'numeric' }) }}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <NewChat v-if="visibilityNewChat" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import NewChat from "./NewChat";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "historyMessages",
      "userList",
      "selectedUserId",
      "visibilityNewChat"
    ]),
    ...mapGetters(["getChatList"])
  },
  methods: {
    ...mapActions(["selectUser", "setVisibilityNewChat"]),
    showNewChat() {
      this.setVisibilityNewChat(true);
    }
  },
  mounted() {
    if (this.getChatList.length) this.selectUser(this.getChatList[0].id);
  },
  components: {
    NewChat
  }
};
</script>

<style lang="scss" scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  width: 40%;
  border-right: 1px solid lightgray;
  @media (min-width: 1024px) {
    width: 20%;
  }
  &__empty {
    text-align: center;
  }
  &__container {
    overflow: hidden;
    flex-grow: 1;
  }
  &__overlay {
    height: 100%;
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.chat-list-move {
  transition: transform 1.5s;
}

.options {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 8px 12px;
  &__new-chat {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 100%;
    }
  }
}

.chat-user {
  height: 40px;
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: lightgray;
  }
  &.selected {
    background: skyblue;
  }
  &__photo {
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  &__title {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__name {
    font-size: 15px;
    line-height: 20px;
    font-weight: bold;
  }
  &__subtitle {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    font-size: 12px;
    line-height: 20px;
  }
  &__last-message {
    max-height: 20px;
    max-width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>