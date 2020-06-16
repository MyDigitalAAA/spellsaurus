<template>
    <div class="spell-list-wrapper">
        <button type="button" class="btn font-display font-weight-bold btn-lg btn-outline-dark btn-block shadow-sm mb-4" @click="showAdd">
            <i class="mad">add</i>
            <span>Ajouter un sort</span>
        </button>
        <div v-masonry transition-duration=".5s" item-selector=".spell-card" class="row spells-list">
            <spell-card v-masonry-tile class="spell-card" v-for="(spell) in spells" :key="spell.id" v-bind:spell="spell" @editSpell="editSpell" @deleteSpell="deleteSpell"/>
        </div>
        <edit-spell-card v-if="Object.keys(current_edit_spell).length > 0" v-bind:spell="current_edit_spell" @editSpell="editSpell" @updateSpell="updateSpell"/>
        <add-spell-card v-if="adding_spell" @cancelAdd="cancelAdd" @addSpell="addSpell"/>
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
        school_id: String
    },
    data() {
        return {
            loading: false,
            spells: [],
            current_edit_spell: {},
            adding_spell: false,
        }
    },
    created() {
        this.computeSpells()
    },
    methods: {
        async fetchSpells() {
            if (!this.school_id) {
                const { data } = await Spells.getSpells()
                return data
            } else {
                const { data } = await Schools.getSpellsFromSchool(this.school_id)
                console.log(data.spells)
                return data.spells
            }
        },
        async computeSpells() {
            this.loading = true
            const displaySpells = await this.fetchSpells()
            this.loading = false
            this.spells = displaySpells
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
        addSpell(e) {
            Spells.getSpell(e.id)
            .then(v => {
                this.spells.unshift(v.data)
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

</style>