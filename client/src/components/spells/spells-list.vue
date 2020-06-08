<template>
    <div class="spell-list-wrapper">
        <div v-masonry transition-duration=".5s" item-selector=".spell-card" class="row spells-list">
            <spell-card v-masonry-tile class="spell-card" v-for="(spell, index) in spells" :key="index" v-bind:spell="spell" @editSpell="editSpell"/>
        </div>
        <edit-spell-card v-bind:spell="active_spell"/>
    </div>
</template>

<script>
// Components
import SpellCard from "./spell-card"
import EditSpellCard from "./edit-spell-card"

// API
import { RepositoryFactory } from "../../../api/repositories"
const spellsRepository = RepositoryFactory.get('spells')

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
    mounted() {
    },
    methods: {
        async fetchSpells() {
            const { data } = await spellsRepository.getSpells()
            return data
        },
        async fetchSpell(id) {
            const { data } = await spellsRepository.getSpell(id)
            return data
        },
        async computeSpells() {
            this.loading = true
            const displaySpells = await this.fetchSpells()
            this.loading = false
            this.spells = displaySpells
        },
        async editSpell(e) {
            this.active_spell = e;
            console.log(this.active_spell)
        }
    }
}

</script>

<style lang="scss">

</style>