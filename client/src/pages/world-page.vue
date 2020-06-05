<template>
  <section class="world-page">
    <div class="container-fluid">
      <div class="p-4">
        <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#spell_show_edit_modal">Spell show/edit modal</button>-->
        <div class="" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="spell_show_edit_modal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div class="h1 modal-title font-display font-weight-bold" id="spell_show_edit_modal"><div class="line-height-100">Sort #00069420</div></div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="spell_name" class="font-weight-bold col-form-label">Nom&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_name" id="spell_name" placeholder="(256 caractères max.)">
                  </div>
                  <div class="form-group">
                    <label for="spell_level" class="font-weight-bold col-form-label">Niveau&nbsp;:</label>
                    <input type="number" class="form-control" name="spell_level" id="spell_level" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)">
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
                    <input type="number" class="form-control" name="spell_charge" id="spell_charge" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)">
                  </div>
                  <div class="form-group">
                    <label for="spell_ingredients" class="font-weight-bold col-form-label">Ingrédients&nbsp;:</label>
                    <textarea class="form-control" name="spell_ingredients" id="spell_ingredients" placeholder="(1024 caractères max., 1 ingrédient par ligne)"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="spell_description" class="font-weight-bold col-form-label">Description&nbsp;:</label>
                    <textarea class="form-control" name="spell_description" id="spell_description" placeholder="(2048 caractères max.)"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="spell_cost" class="font-weight-bold col-form-label">Coût&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_cost" id="spell_cost" placeholder="(32 caractères max.)">
                  </div>
                  <div class="form-group">
                    <label for="spell_variables" class="font-weight-bold col-form-label">Variables&nbsp;:</label>
                    <textarea class="form-control" name="spell_variables" id="spell_variables" placeholder="(1024 caractères max., 1 variable par ligne)"></textarea>
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
  </section>
</template>

<script>
export default {
    name: 'world',
}
</script>

<style lang="scss">
.world-page{position:relative;}</style>