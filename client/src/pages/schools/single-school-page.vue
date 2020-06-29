<template>
  <div class="container-fluid p-4" id="spell-container">
    <h1 class="display-3 font-display mb-3">{{ school.name }}</h1>
    <p>{{ school.description }}</p>
    <spell-list :school_id="id"/>
  </div>
</template>

<script>
import SpellsList from "~/components/spells/spells-list"

// API
import { RepositoryFactory } from "~/api/repositories"
const Schools = RepositoryFactory.get('schools')

export default {
    name: 'single-school',
    components: {
        'spell-list': SpellsList,
    },
    data() {
        return {
            loading: false,
            school: {},
            id: this.$route.params.id
        }
    },
    created() {
        this.computeSchool()
    },
    methods: {
        async fetchSchool(id) {
            const { data } = await Schools.getOne(id)
            return data
        },
        async computeSchool() {
            this.loading = true
            const displaySchool = await this.fetchSchool(this.id)
            this.loading = false
            this.school = displaySchool
        },
    }
}
</script>

<style lang="scss" scoped>

</style>