<template>
    <div v-masonry transition-duration=".5s" item-selector=".spell-card" class="row spells-list">
        <spell-card v-masonry-tile class="spell-card" v-for="(spell, index) in spells" :key="index" v-bind="spell"/>
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
    mounted() {
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
            this.spells = displaySpells.slice(0,10)
        }
    }
}

</script>

<style lang="scss">

</style>