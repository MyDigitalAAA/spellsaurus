<template>
  <div class="container-fluid p-4" id="spell-container">
    <h1 class="display-3 font-display mb-3">{{ spell.name }}</h1>
    <p class="prewrap">{{ spell.description }}</p>  </div>
</template>

<script>
// API
import { RepositoryFactory } from "@/api/repositories";
const Spells = RepositoryFactory.get('spells');

export default {
  name: 'single-spell-page',
  metaInfo() {
    return {
      titleTemplate: this.spell.name ? `%s - ${this.spell.name}` : '%s',
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      spell: {},
      errors: {
        loading: "",
      }
    }
  },
  created() {
    Spells.getOne(this.id)
      .then(v => {
        this.spell = v.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
}
</script>

<style>

</style>