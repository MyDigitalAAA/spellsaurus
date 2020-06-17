<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <router-link :to="'/'" class="navbar-brand font-display font-weight-700">Auracle</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" v-if="links.length != 0">
                <li class="nav-item" v-for="(link, index) in links" :key="index">
                    <router-link :to="link.url" class="nav-link">{{ link.text }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {
                links: [
                    {
                        text: 'Sortilèges',
                        url: '/spells',
                    },
                ]
            }
        }
    }
</script>

<style lang="scss"></style>
