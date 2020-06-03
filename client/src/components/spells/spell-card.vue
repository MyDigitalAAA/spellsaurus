<template>
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 grid-item grid-sizer">
        <div class="bg-white p-4 rounded text-dark border-primary shadow-sm" style="border-left:4px solid;">
            <div class="h3 font-display font-weight-bold text-wrap word-break line-height-100" :title="name">
                <a class="text-decoration-none text-primary" href="/spell/XXX">{{name}}</a>
            </div>
            <div class="font-weight-700 text-muted d-inline-block">Niveau {{level}}</div>
            <div class="text-muted d-inline-block">·
                <span v-for="(school, index) in schools" :key="index">
                    <span v-if="index!=0">,
                </span>{{school.name}}</span>
            </div>
            <div class="small text-muted font-italic">{{description|truncate(256,"…")}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'spell-card',
    props: {
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
            isFlipped: false,
        }
    },
    methods: {
        toggleCard: async function() {
            this.isFlipped = !this.isFlipped;
        }
    },
}

</script>

<style lang="scss" scoped></style>