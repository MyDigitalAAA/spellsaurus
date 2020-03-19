<template>
    <div class="spells-page">
        <v-for v-for="(spell, index) in spells" :key="index">
            <spell-card v-bind="spell"/>
        </v-for>
    </div>
</template>

<script>
import spellcard from "../components/spells/spell-card";

export default {
    name: 'spells',
    components: {
        'spell-card': spellcard,
    },
    data() {
        return {
            spells: [
                {
                    name: 'Soleil Pourri',
                    description: [`Le lanceur projette un petit astre vert jusqu’à 20m autour de lui. L’astre brûle l’air environnant, nécrosant rapidement les formes de vies dans un rayon de 100m.`, `Toutes les créatures dans la portée de l’astre (sauf le lanceur) doivent réussir un jet de CON avec un malus de -30. Si elles échouent, elles subissent 3D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.`],
                    schools: ['Lumomancie', 'Nécromancie'],
                    level: '-30',
                    charge: '2',
                    ingredients: 'Volonté, Geste',
                    cost: '-90',
                    variables: [{
                        name: 'x',
                        description: 'lol',
                    }]
                }
            ]
        }
    }
}

</script>

<style>

</style>