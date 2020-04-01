<template>
    <div class="spells-page">
        <v-for v-for="(spell, index) in spells" :key="index">
            <spell-card v-bind="spell"/>
        </v-for>
    </div>
</template>

<script>
import axios from 'axios';
import spellcard from "../components/spells/spell-card";

export default {
    name: 'spells',
    components: {
        'spell-card': spellcard,
    },
    data() {
        return {
            spells: []
        }
    },
    mounted() {
        axios({ method: "GET", "url": "http://localhost:2814/api/spells"})
        .then(result => {
            this.spells = result.data.spells;
            console.log(result)
        }, error => {
            console.log(error)
        })
    },
}

</script>

<style>

</style>