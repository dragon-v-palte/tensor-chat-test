import Vue from 'vue'
import Vuex from 'vuex'

import { historyMessages as jsonHistoryMessages, userList as jsonUserList } from './data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedUserId: -1,
    visibilityNewChat: false,
    userList: jsonUserList,
    historyMessages: localStorage.historyMessages ? JSON.parse(localStorage.historyMessages) : jsonHistoryMessages
  },
  getters: {
    getUserById: state => id => {
      return state.userList.find(user => user.id == id);
    },
    getMessagesByUserId: state => id => {
      const filteredMessages = state.historyMessages.filter(item => item.userId == id);
      return filteredMessages.sort(function (a, b) { return new Date(a.time) - new Date(b.time) });
    },
    getChatList: (state, getters) => {
      let chatList = [];
      state.userList.forEach(item => {
        const messages = getters.getMessagesByUserId(item.id);
        if (messages.length) {
          const { text, time } = messages[messages.length - 1];
          chatList.push({
            ...item,
            lastMessage: text,
            time
          })
        }
      });
      return chatList.sort(function (a, b) { return new Date(b.time) - new Date(a.time) });
    }
  },
  mutations: {
    selectUser(state, id) {
      state.selectedUserId = id
    },
    sendNewMessage( state, { text, incoming }) {
      state.historyMessages.push({
        id: state.historyMessages.length,
        userId: state.selectedUserId,
        incoming,
        text,
        time: new Date(Date.now()).toString()
      });

      localStorage.setItem('historyMessages', JSON.stringify(state.historyMessages));
    },
    setVisibilityNewChat(state, value) {
      state.visibilityNewChat = value;
    }
  },
  actions: {
    async selectUser(context, value) {
      context.commit('selectUser', value);
    },
    async sendNewMessage(context, value) {
      context.commit('sendNewMessage', value);
    },
    async setVisibilityNewChat(context, value) {
      context.commit('setVisibilityNewChat', value);
    }
  }
})
