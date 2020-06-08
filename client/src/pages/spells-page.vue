<template>
  <div class="container-fluid p-4" id="spell-container">
    <h1 class="display-3 font-display mb-3">Sortilèges</h1>
    <div class="mb-4">
      <form>
        <div class="form-group mb-2">
          <input type="text" class="form-control" name="search_terms" id="search_terms" placeholder="Rechercher un sort">
        </div>
        <div class="mb-3">
          <div class="form-check form-check-inline">
            <input checked class="form-check-input" type="checkbox" id="search_fields_name" value="search_fields_name">
            <label class="form-check-label" for="search_fields_name">Nom</label>
          </div>
          <div class="form-check form-check-inline">
            <input checked class="form-check-input" type="checkbox" id="search_fields_schools" value="search_fields_schools">
            <label class="form-check-label" for="search_fields_schools">École(s)</label>
          </div>
          <div class="form-check form-check-inline">
            <input checked class="form-check-input" type="checkbox" id="search_fields_ingredients" value="search_fields_ingredients">
            <label class="form-check-label" for="search_fields_ingredients">Ingrédients</label>
          </div>
          <div class="form-check form-check-inline">
            <input checked class="form-check-input" type="checkbox" id="search_fields_description" value="search_fields_description">
            <label class="form-check-label" for="search_fields_description">Description</label>
          </div>
          <div class="form-check form-check-inline">
            <input checked class="form-check-input" type="checkbox" id="search_fields_variables" value="search_fields_variables">
            <label class="form-check-label" for="search_fields_variables">Variables</label>
          </div>
        </div>
      </form>
      <button type="button" class="btn font-display font-weight-bold btn-lg btn-outline-dark btn-block shadow-sm"><i class="mad">add</i> Ajouter un sort</button>
    </div>
    <spell-list/>
  </div>
</template>

<script>
  import SpellsList from "../components/spells/spells-list"

  export default {
    name: 'spells',
    components: {
        'spell-list': SpellsList,
    }
  }
</script>

<style lang="scss"></style>