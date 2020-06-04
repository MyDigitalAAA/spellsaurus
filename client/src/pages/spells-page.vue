<template>
  <div class="container-fluid p-4" id="spell-container">
    <h1 class="display-3 font-display mb-4">Sortilèges</h1>
    <spell-list/>
  </div>
</template>

<script>
  import spellslist from "../components/spells/spells-list"

  export default {
    name: 'spells',
    components: {
        'spell-list': spellslist,
    }
  }
</script>

<style lang="scss">
  #spell-container{
    background: url('/img/bg1.png') center center fixed repeat;
  }
</style>