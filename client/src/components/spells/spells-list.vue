<template>
    <div class="spell-list-wrapper">
        <div v-masonry transition-duration=".5s" item-selector=".spell-card" class="row spells-list">
            <spell-card v-masonry-tile class="spell-card" v-for="(spell) in spells" :key="spell.id" v-bind:spell="spell" @editSpell="editSpell" @deleteSpell="deleteSpell"/>
        </div>
        <edit-spell-card v-if="Object.keys(active_spell).length > 0" v-bind:spell="active_spell" @updateSpell="updateSpell"/>
    </div>
</template>

<script>
// Components
import SpellCard from "./spell-card"
import EditSpellCard from "./edit-spell-card"

// API
import { RepositoryFactory } from "../../../api/repositories"
const Spells = RepositoryFactory.get('spells')

export default {
    name: 'spellslist',
    components: {
        'spell-card': SpellCard,
        'edit-spell-card': EditSpellCard,
    },
    data() {
        return {
            loading: false,
            spells: [],
            active_spell: {},
        }
    },
    created() {
        this.computeSpells()
    },
    methods: {
        async fetchSpells() {
            const { data } = await Spells.getSpells()
            return data
        },
        async computeSpells() {
            this.loading = true
            const displaySpells = await this.fetchSpells()
            this.loading = false
            this.spells = displaySpells
        },
        editSpell(e) {
            this.active_spell = e;
        },
        updateSpell(e) {
            let oldSpell = this.spells.find(x => x.id === e.id)
            this.spells.splice(this.spells.indexOf(oldSpell), 1, e)
            this.active_spell = {}
        },
        deleteSpell(e) {
            this.spells.splice(this.spells.indexOf(e), 1)
            this.active_spell = {}
        }
    }
}

</script>

<style lang="scss">

</style>