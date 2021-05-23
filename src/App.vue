<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// 圓體字體
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);

#app {
  font-family:'cwTeXYen', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>

import { render, staticRenderFns } from "./App.vue?vue&type=template&id=f4c28c7a&"
var script = {}
import style0 from "./App.vue?vue&type=style&index=0&lang=scss&"


/* normalize component */
import normalizer from "!../node_modules/vue-loader/lib/runtime/componentNormalizer.js"
var component = normalizer(
    script,
    render,
    staticRenderFns,
    false,
    null,
    null,
    null

)

export default component.exports
</script>
