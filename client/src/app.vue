<template>
    <div id="srs">

        <header>
            <navigation/>
        </header>
        
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

</style>
