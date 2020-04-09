<template>
    <section class="spells-page">
        <spell-list/>
    </section>
</template>

<script>

// Components
import spellslist from "../components/spells/spells-list"

export default {
    name: 'spells',
    components: {
        'spell-list': spellslist,
    }
}

</script>

<style>

</style>