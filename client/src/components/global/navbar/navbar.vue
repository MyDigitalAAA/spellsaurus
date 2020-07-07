<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <router-link :to="'/'" class="navbar-brand font-display font-weight-700">Auracle</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav mr-auto" v-if="links.length != 0">
                <li class="nav-item" v-for="(link, index) in links" :key="index">
                    <router-link :to="link.url" class="nav-link">{{ link.text }}</router-link>
                </li>
            </ul>
            <div v-if="loggedIn" class="navbar-nav">
                <router-link :to="'/profil'" class="nav-link">Profil</router-link>
                <div @click="logoutUser()" class="nav-link">Deconnexion</div>
            </div>
            <div v-else class="navbar-nav">
                <router-link :to="'/connexion'" class="nav-link">Connexion</router-link>
            </div>
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
                        url: '/sorts',
                    },
                    {
                        text: 'Écoles',
                        url: '/ecoles',
                    }
                ]
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.status.loggedIn;
            }
        },
        methods: {
            logoutUser() {
                if (this.$cookies.get('U_') != null) {
                    this.$cookies.remove('U_')
                    this.$store.commit('logout')
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style lang="scss"></style>
