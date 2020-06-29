<template>
    <div class="spell-list-wrapper">
        <div class="mb-4">
            <form>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" v-model="search_text" name="search_terms" id="search_terms" placeholder="Rechercher l'arcane">
                </div>
                <div class="mb-3">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="search_term" id="search_fields_name" value="search_fields_name">
                        <label class="form-check-label" for="search_fields_name">Nom</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="search_term" id="search_fields_description" value="search_fields_description" checked>
                        <label class="form-check-label" for="search_fields_description">Description</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="search_term" id="search_fields_schools" value="search_fields_schools" disabled>
                        <label class="form-check-label" for="search_fields_schools">École(s)</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="search_term" id="search_fields_ingredients" value="search_fields_ingredients" disabled>
                        <label class="form-check-label" for="search_fields_ingredients">Ingrédients</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="search_term" id="search_fields_variables" value="search_fields_variables" disabled>
                        <label class="form-check-label" for="search_fields_variables">Variables</label>
                    </div>
                </div>
            </form>
        </div>
        <button type="button" class="btn font-display font-weight-bold btn-lg btn-outline-dark btn-block shadow-sm mb-4" @click="showAdd">
            <i class="mad">add</i>
            <span>Ajouter un sort</span>
        </button>
        <div
            v-if="computedSpells.length > 0"
            class="spell-list-wrapper">
            <div
                class="row spells-list"
                v-masonry
                transition-duration="1s"
                item-selector=".spell-card">
                    <spell-card
                        class="spell-card"
                        v-masonry-tile
                        v-for="(spell) in computedSpells"
                        :key="spell.id"
                        :spell="spell"
                        @editSpell="editSpell"
                        @deleteSpell="deleteSpell" />
            </div>

            <edit-spell-card
                v-if="Object.keys(current_edit_spell).length > 0"
                :spell="current_edit_spell"
                @editSpell="editSpell"
                @updateSpell="updateSpell"/>

            <add-spell-card
                v-if="adding_spell"
                @cancelAdd="cancelAdd"
                @addSpell="addSpell"/>
        </div>
        <div
            v-else
            class="loader-wrapper">
            <loader/>
        </div>
    </div>
</template>

<script>
// Components
import SpellCard from "./spell-card"
import EditSpellCard from "./edit-spell-card"
import AddSpellCard from "./add-spell-card"

// API
import { RepositoryFactory } from "~/api/repositories"
const Spells = RepositoryFactory.get('spells')
const Schools = RepositoryFactory.get('schools')

export default {
    name: 'spellslist',
    components: {
        'spell-card': SpellCard,
        'edit-spell-card': EditSpellCard,
        'add-spell-card': AddSpellCard,
    },
    props: {
        school_id: String,
    },
    data() {
        return {
            spells: [],
            loading: false,
            current_edit_spell: {},
            currentIndex: 1,
            adding_spell: false,
            search_text: "",
        }
    },
    computed: {
        computedSpells() {
            return this.spells
        }
    },
    beforeMount() {
        this.spells = this.computedSpells
        if (!this.school_id) {
            this.getInitialSpells()
        } else {
            this.getInitialSchoolSpells()
        }
    },
    mounted() {
        if (!this.school_id) {
            this.scroll()
        }
    },
    methods: {
        getInitialSpells() {
            Spells.getPage(this.currentIndex)
            .then(v => {
                this.loading = true
                let spells = this.computedSpells
                spells.push(v.data)
                this.spells = spells[0]
            })
            .then(() => {
                this.currentIndex++
                this.loading = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        getInitialSchoolSpells() {
            Schools.getSpellsFromOne(this.school_id)
            .then(v => {
                this.loading = true
                let spells = this.computedSpells
                spells.push(v.data.spells)
                this.spells = spells[0]
            })
            .then(() => {
                this.currentIndex++
                this.loading = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        scroll() {
            window.onscroll = () => {
                if (((window.innerHeight + window.scrollY) - document.body.offsetHeight) >= -1) {
                    Spells.getPage(this.currentIndex)
                    .then(v => {
                        this.loading = true
                        let spells = this.computedSpells
                        for (let i = 0; i < v.data.length; i++) {
                            const element = v.data[i];
                            spells.push(element)
                        }
                    })
                    .then(() => {
                        this.currentIndex++
                        this.loading = false
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        editSpell(e) {
            this.current_edit_spell = e;
        },
        showAdd() {
            this.adding_spell = true
        },
        cancelAdd() {
            this.adding_spell = false
        },
        // Receives events to update the data
        addSpell(e) {
            Spells.getOne(e.id)
            .then(v => {
                let spells = this.computedSpells
                spells.unshift(v.data)
            })
            .then(() => {
                this.adding_spell = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateSpell(e) {
            let oldSpell = this.spells.find(x => x.id === e.id)
            this.spells.splice(this.spells.indexOf(oldSpell), 1, e)
            this.current_edit_spell = {}
        },
        deleteSpell(e) {
            this.spells.splice(this.spells.indexOf(e), 1)
            this.current_edit_spell = {}
        }
    }
}

</script>

<style lang="scss">
.loader-wrapper {
    margin-top: 3rem;
    text-align: center;
}
</style>