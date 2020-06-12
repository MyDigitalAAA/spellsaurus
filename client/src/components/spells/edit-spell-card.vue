<template>
    <div
        :spell="computeSpell"
        class="container-fluid">
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
                <form id="update-spell" @submit="updateSpell">
                  <div class="form-group">
                    <label for="spell_name" class="font-weight-bold col-form-label">Nom&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_name" id="spell_name" placeholder="(256 caractères max.)" v-model="spell.name">
                  </div>
                  <div class="form-group">
                    <label for="spell_description" class="font-weight-bold col-form-label">Description&nbsp;:</label>
                    <textarea class="form-control" name="spell_description" id="spell_description" placeholder="(2048 caractères max.)" v-model="spell.description"></textarea>
                  </div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="spell_rituel" v-model="spell.is_ritual">
                    <label for="spell_ritual" class="font-weight-bold col-form-label">Rituel ?&nbsp;:</label>
                  </div>
                  <div class="form-group">
                    <label for="spell_level" class="font-weight-bold col-form-label">Niveau&nbsp;:</label>
                    <input type="number" class="form-control" name="spell_level" id="spell_level" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)" v-model="spell.level">
                  </div>
                  <div class="form-group">
                    <label for="spell_schools" class="font-weight-bold col-form-label">École(s)&nbsp;:</label>
                    <select class="form-control" id="spell_schools" name="spell_schools" multiple v-model="spell_school_ids">
                        <option v-for="(school,index) in all_schools" :key="index" :value="'school_' + school.id">{{school.name}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="spell_charge" class="font-weight-bold col-form-label">Charge&nbsp;:</label>
                    <input type="number" class="form-control" name="spell_charge" id="spell_charge" min="0" max="100" step="1" placeholder="(Nombre entier de 0 à 100)" v-model="spell.charge">
                  </div>
                  <div class="form-group">
                    <label for="spell_ingredients" class="font-weight-bold col-form-label">Ingrédient(s)&nbsp;:</label>
                    <select class="form-control" id="spell_ingredients" name="spell_ingredients" multiple v-model="spell_ingredient_ids">
                        <option v-for="(ingredient,index) in all_ingredients" :key="index" :value="'ingredient_' + ingredient.id">{{ingredient.name}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="spell_cost" class="font-weight-bold col-form-label">Coût&nbsp;:</label>
                    <input type="text" class="form-control" name="spell_cost" id="spell_cost" placeholder="(32 caractères max.)" v-model="spell.cost">
                  </div>
                  <div class="form-group">
                    <label for="spell_variables" class="font-weight-bold col-form-label">Variables(s)&nbsp;:</label>
                    <select class="form-control" id="spell_variables" name="spell_variables" multiple v-model="spell_variable_ids">
                        <option v-for="(variable,index) in all_variables" :key="index" :value="'variable_' + variable.id">{{variable.description}}</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                <input type="submit" class="btn btn-primary" value="Enregistrer" form="update-spell">
                <button type="button" class="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// API
import { RepositoryFactory } from "../../../api/repositories"
const Spells = RepositoryFactory.get('spells')
const Schools = RepositoryFactory.get('schools')
const Variables = RepositoryFactory.get('variables')
const Ingredients = RepositoryFactory.get('ingredients')

export default {
    name: 'edit-spell-card',
    props: {
        spell: {
            type: Object,
            required: true,
            id: Number,
            name: String,
            description: String,
            is_ritual: Boolean,
            schools: Array,
            variables: Array,
            ingredients: Array,
        },
    },
    data() {
        return {
            all_schools: [],
            all_variables: [],
            all_ingredients: [],

            spell_school_ids: [],
            spell_variable_ids: [],
            spell_ingredient_ids: [],
        }
    },
    computed: {
        computeSpell() {
            let output = this.spell
            console.log(output)
            return output
        }
    },
    created() {
        let fetchSchools = Schools.getSchools()
        let fetchVariables = Variables.getVariables()
        let fetchIngredients = Ingredients.getIngredients()

        Promise.all([fetchSchools, fetchVariables, fetchIngredients])
        .then(v => {
            this.all_schools = v[0].data
            this.all_variables = v[1].data
            this.all_ingredients = v[2].data
            this.getAssociatedValues(this.spell)
        })
        .catch(err => {
            console.log(err)
        })
    },
    mounted() {

    },
    watch: {
        spell: {
            deep: true,
            handler() {
                this.getAssociatedValues(this.spell)
            }
        }
    },
    methods: {
        setSpell(spell) {
            this.spell = spell
        },
        getAssociatedValues(spell) {
            this.spell_school_ids = []
            this.spell_variable_ids = []
            this.spell_ingredient_ids = []

            spell.schools.forEach(element => {
                this.spell_school_ids.push(element['id'])
            })
            spell.variables.forEach(element => {
                this.spell_variable_ids.push(element['id'])
            })
            spell.ingredients.forEach(element => {
                this.spell_ingredient_ids.push(element['id'])
            })
        },
        updateSpell(e) {
            e.preventDefault()

            let schoolsData = Object.values(this.spell_school_ids).map(v => { return parseInt(v.slice(7)) })
            let variablesData = Object.values(this.spell_variable_ids).map(v => { return parseInt(v.slice(9)) })
            let ingredientsData = Object.values(this.spell_ingredient_ids).map(v => { return parseInt(v.slice(11)) })

            let data = {
                name: this.spell.name,
                description: this.spell.description,
                is_ritual: !!+this.spell.is_ritual,
                schools: schoolsData,
                variables: variablesData,
                ingredients: ingredientsData,
            }

            Spells.updateSpell(this.spell.id, data)
            .then(v => {
                this.setSpell(v.data)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    textarea, select {
        min-height: 10rem;
    }
</style>