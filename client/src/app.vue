<template>
  <div id="srs">
    <header>
      <navbar/>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Auracle',
  }
}
</script>

<style lang="scss" scoped>
#srs {
  padding-top: 50px;
  min-height: 100vh;
  background: url('./assets/images/bg1.png') center center fixed repeat;
}
</style>