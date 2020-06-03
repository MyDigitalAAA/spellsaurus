<template>
  <div class="container-fluid p-4">
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

<style lang="scss"></style>