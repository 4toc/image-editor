<script setup></script>

<template>
  <div class="user-data">
    <div class="user-data__background"></div>
    <div class="user-data__avatar">
      <img src="@/assets/images/user_avatar.jpg" alt="">
    </div>
  </div>
</template>

<style lang="scss">
.user-data {
  position: relative;

  &__background {
    height: 195px;
    width: 100%;
    background-image: url("@/assets/images/user_background.png");
    background-position: center;
    background-size: cover;
  }

  &__avatar {
    height: 60px;
    width: 60px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    margin: auto;
    border-radius: 10em;
    border: 2px solid #FFFFFF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10em;
    }
  }
}
</style>
