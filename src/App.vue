<template>
  <div id="app">
    <header>
      <div class="myPicture">
        <img alt="Vue logo" src="./assets/me.png" />
      </div>
      <div class="myName">Baron</div>
      <div class="routerApp">
        <router-link to="/me">简历</router-link>
        <router-link to="/live">点滴</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss" >
  @import "./scss/App.scss";
</style>
