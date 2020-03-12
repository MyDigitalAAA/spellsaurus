<template>
    <div id="srs">

        <navigation/>
        <router-view/>

    </div>
</template>

<script>

import navbar from "./components/global/navbar/navbar";

export default {
  name: 'app',
  components: {
    'navigation': navbar
  }
}

</script>

<style lang="scss">

    #srs {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
