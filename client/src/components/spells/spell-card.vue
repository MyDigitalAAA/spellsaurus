<template>
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 grid-item grid-sizer">
      <div class="bg-white p-4 rounded text-dark border-primary shadow-sm" style="border-left:4px solid;">
        <div class="h3 font-display font-weight-bold text-wrap word-break line-height-100" :title="name"><a class="text-decoration-none text-primary" href="/spell/XXX">{{name}}</a></div>
        <div class="font-weight-700 text-muted d-inline-block">Niveau {{level}}</div> <div class="text-muted d-inline-block">· <span v-for="(school, index) in schools" :key="index"><span v-if="index!=0">, </span>{{school.name}}</span></div>
        <div class="small text-muted font-italic">{{description|truncate(256,"…")}}</div>
      </div>
    </div>
    <!--<article class="spell-card">
        <div class="content">
            <header>
                <h3>{{ name }}</h3>
            </header>
            <section class="casting-header">
                <div class="casting-infos">
                    <div class="type">
                        <div class="level">
                            <div class="label">
                                <span>LV.</span>
                                <br>
                                <span>MIN</span>
                            </div>
                            <var>{{ level }}</var>
                        </div>
                        <ul class="schools">
                            <li v-for="(school, index) in schools" :key="index">
                                {{ school.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="cost">
                        <span class="label">Malus</span>
                        <var>{{ cost }}</var>
                    </div>
                    <div class="charge">
                        <span class="label">Charge</span>
                        <var>{{ charge }}</var>
                    </div>
                </div>
                <div class="casting-ingredients">
                    <p class="title">Nécessite :</p>
                    <p class="content">
                        <span v-for="(ingredient, index) in ingredients" :key="index">
                            {{ ingredient.name }}<span v-if="index != Object.keys(ingredients).length - 1">, </span>
                        </span>
                    </p>
                </div>
            </section>
            <hr>
            <section class="spell-description">
                <p>{{ description }}</p>
            </section>
            <hr>
            <footer v-if="variables">
                <div class="label">Variables</div>
                <div class="variables">
                    <div v-for="(variable, index) in variables" :key="index" class="xyz">
                        <span>{{ variable.name }}</span>
                        <var>{{ variable.description }}</var>
                    </div>
                </div>
            </footer>
        </div>
    </article>-->
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

<style lang="scss"></style>