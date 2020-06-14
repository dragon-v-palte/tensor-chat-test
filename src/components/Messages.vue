<template>
  <div class="messages">
    <div class="messages__history history">
      <p
        class="history__message"
        :class="message.incoming ? 'incoming' : ''"
        :key="message.id"
        v-for="message in messagesList"
      >{{ message.text }}</p>
    </div>
    <form class="messages__send-message send-message" @submit.prevent="onSendNewMessage">
      <input class="send-message__input" placeholder="Write message..." v-model="message" />
      <button class="send-message__button" type="submit">
        <img class="send-message__icon" src="../../public/icons/send-message.png" alt="Send" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["selectedUserId", "historyMessages"]),
    ...mapGetters(["getMessagesByUserId"]),
    messagesList() {
      return this.getMessagesByUserId(this.selectedUserId);
    }
  },
  methods: {
    ...mapActions(["sendNewMessage"]),
    onSendNewMessage() {
      if (this.message)
        this.sendNewMessage({
          text: this.message,
          incoming: false
        }).then(() => {
          var divHistoryMessages = this.$el.querySelector(".history");
          if (divHistoryMessages) divHistoryMessages.scrollTop = divHistoryMessages.scrollHeight;
        });
      this.message = "";
    }
  }
};
</script>

<style lang="scss">
.messages {
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  border-right: 0;
  height: calc(100% - 41px);
  @media (min-width: 1024px) {
    height: 100%;
    border-right: 1px solid lightgray;
  }
}

.history {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  border-bottom: 1px solid lightgray;
  padding: 12px;
  overflow-y: scroll;
  background: white;
  &__message {
    color: #000000;
    background: #ffffff;
    align-self: flex-end;
    max-width: 60%;
    margin-top: 12px;
    border-radius: 5px;
    padding: 8px 12px;
    border: 1px solid gray;
    word-wrap: break-word;
    &:first-child {
      margin-top: auto !important;
    }
    &.incoming {
      background: lightseagreen;
      color: #ffffff;
      border-color: darkolivegreen;
      align-self: flex-start;
    }
  }
}
::-webkit-scrollbar {
  width: 0px;
  background: rgba(255, 255, 255, 0);
}

.send-message {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
  min-height: 40px;
  &__input {
    flex-grow: 1;
    font-size: 14px;
    border-radius: 5px;
    outline: none;
    padding: 8px 12px;
    border: 1px solid gray;
  }
  &__button {
    background: transparent;
    border: 0;
    padding: 0;
    margin-left: 12px;
    cursor: pointer;
    outline: none;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 100%;
    }
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
</style>