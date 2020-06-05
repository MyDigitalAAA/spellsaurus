<template>
    <div
        :class="main_school"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 grid-item grid-sizer">
        <div class="bg-white p-4 rounded text-dark border-primary shadow-sm" style="border-left:4px solid;">
            <div class="h3 font-display font-weight-bold text-wrap word-break line-height-100" :title="name">
                <a class="text-decoration-none text-primary" :href="'/spell/'+id">{{name}}</a>
            </div>
            <div>
                <div class="font-weight-700 text-muted d-inline-block">Niveau {{level}}</div><span> · </span>
                <div class="text-muted d-inline-block">
                    <span v-for="(school,index) in schools" :key="index"><span v-if="index!=0">, </span><a :href="'/school/'+school.id">{{school.name}}</a></span>
                </div>
            </div>
            <div v-if="charge!=0" class="small font-weight-bold">Charge {{charge}} tour(s)</div>
            <div v-if="ingredients.length>0" class="small"><span class="font-weight-bold">Nécessite</span> <span v-for="(ingredient,index) in ingredients" :key="index"><span v-if="index!=0">, </span>{{ingredient.name}}</span></div>
            <div class="small text-muted font-italic mt-2">{{description}}</div>
            <div class="mt-2">
                <div class="font-weight-bold d-inline-block">Coût {{cost}}</div>
                <div v-if="variables.length>0" class="small d-inline-block">, où&nbsp;:</div>
                <div class=small>
                    <span v-for="(variable,index) in variables" :key="index"><span class="font-weight-bold"><span v-if="index!=0"><br></span>{{String.fromCharCode(120+index)}}</span> = {{variable.description}}</span>
                </div>
            </div>
            <div class="text-right">
                <a class="h5 text-secondary mr-1" :href="'/spell/'+id+'/edit'"><i class="mad">edit</i></a>
                <a class="h5 text-danger" :href="'/spell/'+id+'/delete'"><i class="mad">delete</i></a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'spell-card',
    props: {
        // Model validation
        id: Number,
        name: String,
        description: String,
        level: Number,
        charge: Number,
        cost: String,
        schools: Array,
        ingredients: Array,
        variables: Array,
    },
    data() {
        return {
            main_school: this.schools[0].name,
        }
    },
    created() {
        this.main_school = this.main_school.toLowerCase();
    },
    methods: {
    },
}

</script>

<style lang="scss" scoped>
    .spell-card {
        &.lumomancie {
            .border-primary {
                border-left-color: #99dada !important;
                color: #99dada;
            }
        }
    }
</style>