<template>
    <div class="container-fluid p-4" id="spell-container">
        <h1 class="display-3 font-display mb-3">Sortilèges</h1>
        <spell-list/>
    </div>
</template>

<script>
import SpellsList from "~/components/spells/spells-list"

export default {
  name: 'spells-page',
  components: {
    'spell-list': SpellsList,
  }
}
</script>

<style lang="scss"></style>