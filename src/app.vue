<template>
    <div id="app">

        <navbar></navbar>
        
        <spellcard
            v-bind:name="'Soleil Pourri'"
            v-bind:description="[`Le lanceur projette un petit astre vert jusqu’à 20m autour de lui. L’astre brûle l’air environnant, nécrosant rapidement les formes de vies dans un rayon de 100m.`, `Toutes les créatures dans la portée de l’astre (sauf le lanceur) doivent réussir un jet de CON avec un malus de -30. Si elles échouent, elles subissent 3D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.`]"
            v-bind:schools="['Lumomancie', 'Nécromancie']"
            v-bind:level="'30'"
            v-bind:charge="'2'"
            v-bind:ingredients="`Volonté, Geste`"
            v-bind:cost="'-90'"
            v-bind:variables="[{name: 'x', description: 'lol'}]"
            />

    </div>
</template>

<script>
import spellcard from './components/spells/spell-card.vue'
import navbar from "./components/global/navbar.vue";

export default {
  name: 'app',
  components: {
    spellcard,
    navbar
  }
}
</script>

<style lang="scss">

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
