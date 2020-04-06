<template>
    <div class="spells-page">
        <spell-list/>
    </div>
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