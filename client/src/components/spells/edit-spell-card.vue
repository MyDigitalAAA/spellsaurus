<template>
    <div class="container-fluid">
      <div class="p-4">
        <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#spell_show_edit_modal">Spell show/edit modal</button>-->
        <div class="" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="spell_show_edit_modal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div class="h1 modal-title font-display font-weight-bold" id="spell_show_edit_modal"><div class="line-height-100">{{spell.name}}#{{spell.id}}</div></div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="spell_name" class="font-weight-bold col-form-label">Nom&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_name" id="spell_name" placeholder="(256 caractères max.)" v-bind:value="spell.name">
                  </div>
                  <div class="form-group">
                    <label for="spell_description" class="font-weight-bold col-form-label">Description&nbsp;:</label>
                    <textarea class="form-control" name="spell_description" id="spell_description" placeholder="(2048 caractères max.)" v-bind:value="spell.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="spell_level" class="font-weight-bold col-form-label">Niveau&nbsp;:</label>
                    <input type="number" class="form-control" name="spell_level" id="spell_level" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)" v-bind:value="spell.level">
                  </div>
                  <div class="form-group">
                    <label for="spell_schools" class="font-weight-bold col-form-label">École(s)&nbsp;:</label>
                    <select class="form-control" id="spell_schools" name="spell_schools" multiple>
                      <option value="1">Lumomancie</option>
                      <option value="2">Vitamancie</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="spell_charge" class="font-weight-bold col-form-label">Charge&nbsp;:</label>
                    <input type="number" class="form-control" name="spell_charge" id="spell_charge" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)" v-bind:value="spell.charge">
                  </div>
                  <div class="form-group">
                    <label for="spell_ingredients" class="font-weight-bold col-form-label">Ingrédient(s)&nbsp;:</label>
                    <select class="form-control" id="spell_ingredients" name="spell_ingredients" multiple>
                      <option value="1">Langue de salamandre</option>
                      <option value="2">Geste</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="spell_cost" class="font-weight-bold col-form-label">Coût&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_cost" id="spell_cost" placeholder="(32 caractères max.)" v-bind:value="spell.cost">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary">Enregistrer</button>
                <button type="button" class="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'edit-spell-card',
    props: {
        spell: Object,
    },
}
</script>

<style>

</style>