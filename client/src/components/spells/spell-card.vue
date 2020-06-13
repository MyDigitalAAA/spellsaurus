<template>
    <div
        :class="main_school"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 grid-item grid-sizer">
        <div class="spellcard bg-white p-4 rounded text-dark shadow" style="border-left-width:4px;border-left-style:solid;">
            <div class="h3 font-display font-weight-bold text-wrap word-break" :title="spell.name" style="line-height:100%;">
                <a class="text-decoration-none" href="#">{{spell.name}}</a>
            </div>
            <div>
                <div class="font-weight-700 text-muted d-inline-block">Niveau {{spell.level}}</div><span> · </span>
                <div class="text-muted d-inline-block">
                    <span v-for="(school,index) in spell.schools" :key="index"><span v-if="index!=0">, </span><a :href="'/school/'+school.id" class="text-secondary">{{school.name}}</a></span>
                </div>
            </div>
            <div v-if="spell.charge!=0" class="small font-weight-bold">Charge {{spell.charge}} tour(s)</div>
            <div v-if="spell.ingredients.length>0" class="small"><span class="font-weight-bold">Nécessite</span> <span v-for="(ingredient,index) in spell.ingredients" :key="index"><span v-if="index!=0">, </span>{{ingredient.name}}</span></div>
            <div class="small text-muted font-italic mt-2">{{spell.description}}</div>
            <div class="mt-2">
                <div class="font-weight-bold d-inline-block">Coût {{spell.cost}}</div>
                <div v-if="spell.variables.length>0" class="small d-inline-block">, où&nbsp;:</div>
                <div class=small>
                    <span v-for="(variable,index) in spell.variables" :key="index"><span class="font-weight-bold"><span v-if="index!=0"><br></span>{{String.fromCharCode(120+index)}}</span> = {{variable.description}}</span>
                </div>
                <div class="text-right">
                    <a class="h5 text-secondary mr-1">
                        <i class="mad" @click="editSpell(spell)">edit</i>
                    </a>
                    <a class="h5 text-danger">
                        <i class="mad" @click="deleteSpell(spell)">delete</i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// API
import { RepositoryFactory } from "../../../api/repositories"
const Spells = RepositoryFactory.get('spells')

export default {
    name: 'spell-card',
    props: {
        spell: Object,
    },
    data() {
        return {
            main_school: this.spell.schools[0].name,
        }
    },
    created() {
        this.main_school = this.main_school.toLowerCase();
    },
    methods: {
        editSpell(spell) {
            this.$emit('editSpell', spell)
        },
        deleteSpell(spell) {
            Spells.deleteSpell(this.spell.id)
            .then(() => {
                this.$emit('deleteSpell', spell)
            })
        }
    },
}

</script>

<style lang="scss" scoped>
  .spell-card {
    @mixin colorschool($sname,$scolor) {
      &.#{$sname} {
        .spellcard { border-left-color: $scolor; }
        .h3>a { color: $scolor; }
      }
    }
    @include colorschool(lumomancie,#babaa4);
    @include colorschool(vitamancie,#57ab6e);
    @include colorschool(obstrumancie,#bd4a66);
    @include colorschool(tenebromancie,#404842);
    @include colorschool(necromancie,#5d4777);
    @include colorschool(morbomancie,#d8733d);
    @include colorschool(pyromancie,#b6362a);
    @include colorschool(hydromancie,#3f68c7);
    @include colorschool(electromancie,#cd9731);
    @include colorschool(terramancie,#7e5540);
    @include colorschool(caelomancie,#a8a8a8);
    @include colorschool(légimancie,#5dbabd);
    @include colorschool(illusiomancie,#9f63a1);
    @include colorschool(cruciomancie,#252451);
    @include colorschool(chronomancie,#79896a);
    @include colorschool(spatiomancie,#2d4776);
    @include colorschool(kénomancie,#101010);
    @include colorschool(lutomancie,#4e2827);
    @include colorschool(échomancie,#6d9fd1);
    @include colorschool(protomancie,#4f5751);
    @include colorschool(rebumancie,#8e7245);
    @include colorschool(vocamancie,#247864);
    @include colorschool(somamancie,#976c67);
    @include colorschool(antimancie,#ad95c1);
  }
</style>