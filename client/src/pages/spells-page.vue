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
    },
    mounted(){
      window.$(".grid").masonry({
        itemSelector:".grid-item",
        columnWidth:".grid-sizer",
        percentPosition: true
      });
    }
  }
</script>

<style lang="scss"></style>