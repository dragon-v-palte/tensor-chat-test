<template>
  <div class="person">
    <img class="person__photo" :src="personImage" />
    <span class="person__name">{{ this.personName }}</span>
    <div class="person__icons icons">
      <a href="#">
        <img class="icons__item" src="../../public/icons/phone.png" />
      </a>
      <a href="#">
        <img class="icons__item" src="../../public/icons/video.png" />
      </a>
      <a href="#">
        <img class="icons__item" src="../../public/icons/like.png" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["selectedUserId"]),
    ...mapGetters(["getUserById", "getChatList"]),
    personImage() {
      if (this.selectedUserId >= 0) {
        return require(`../../public/persons/${
          this.getUserById(this.selectedUserId).photo
        }`);
      } else {
        if (this.getChatList.length)
          return require(`../../public/persons/${
            this.getUserById(this.getChatList[0].id).photo
          }`);
        else return "";
      }
    },
    personName() {
      if (this.selectedUserId >= 0) {
        return this.getUserById(this.selectedUserId).name;
      } else {
        if (this.getChatList.length)
          return this.getUserById(this.getChatList[0].id).name;
        else return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.person {
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid lightgray;
  @media (min-width: 1024px) {
    width: 25%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 0;
  }
  &__photo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
    @media (min-width: 1024px) {
      width: 140px;
      height: 140px;
      margin: 0;
      margin-bottom: 12px;
    }
  }
  &__name {
    font-size: 15px;
    text-align: left;
    flex-grow: 1;
    @media (min-width: 1024px) {
      flex-grow: 0;
    }
  }
}

.icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 24px;
  &__item {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: 12px;
    &:hover {
      opacity: 0.8;
    }
    @media (min-width: 1024px) {
      margin: 12px 6px;
    }
  }
}
</style>