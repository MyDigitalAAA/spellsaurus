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
  name: 'app'
}
</script>

<style lang="scss" scoped>
#srs {
    min-height: 100vh;
    background: url('/img/bg1.png') center center fixed repeat;
}
</style>