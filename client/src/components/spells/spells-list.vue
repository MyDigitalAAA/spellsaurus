<template>
    <div class="row grid">
        <spell-card v-for="(spell, index) in spells" :key="index" v-bind="spell"/>
    </div>
</template>

<script>

// Components
import spellcard from "./spell-card"
// API
import { RepositoryFactory } from "../../../api/repositories"
const spellsRepository = RepositoryFactory.get('spells')

export default {
    name: 'spellslist',
    components: {
        'spell-card': spellcard,
    },
    data() {
        return {
            loading: false,
            spells: []
        }
    },
    created() {
        this.computeSpells()
    },
    methods: {
        async fetchSpells() {
            const { data } = await spellsRepository.getSpells()
            console.log(data)
            return data
        },
        async computeSpells() {
            this.loading = true
            const displaySpells = await this.fetchSpells();
            this.loading = false
            this.spells = displaySpells
        }
    }
}

</script>

<style lang="scss"></style>