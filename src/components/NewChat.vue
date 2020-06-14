<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog">
      <div class="modal" ref="modal">
        <header class="modal-header">
          <slot name="header">
            <h2 class="modal-header__title">Choose contact</h2>
            <button
              type="button"
              class="modal-header__btn-close"
              @click="close"
              aria-label="Close modal"
            >&times;</button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <div v-for="user in userList" :key="user.id" @click="select(user)" class="user">
              <img class="user__photo" :src="require(`../../public/persons/${user.photo}`)" />
              <span class="user__name">{{ user.name }}</span>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["userList", "visibilityNewChat"])
  },
  methods: {
    ...mapActions(["selectUser", "setVisibilityNewChat"]),
    select(user) {
      this.selectUser(user.id);
      this.close();
    },
    close() {
      this.setVisibilityNewChat(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  height: 40px;
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: skyblue;
  }
  &.selected {
    background: dodgerblue;
  }
  &__photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  &__name {
    font-size: 15px;
    line-height: 15px;
    font-weight: bold;
  }
}
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.modal-header {
  font-size: 16px;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 16px;
  }
  &__btn-close {
    border: none;
    font-size: 24px;
    line-height: 12px;
    padding: 0;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    &:hover {
      opacity: 0.6;
    }
  }
}

.modal-body {
  position: relative;
  padding: 0;
  max-height: 300px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>