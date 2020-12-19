<template>
    <div class="container-fluid">
        <section class="d-flex justify-content-center align-items-center">
            <main>
                <div class="title font-display mb-3">Connexion</div>
                <form @submit="logUser">
                    <div class="form-group">
                        <label for="email">Addresse mail</label>
                        <input
                            v-model="email"
                            type="email"
                            id="email"
                            class="form-control"
                            placeholder="john.doe@gmail.com"
                            autocomplete="email">
                        <small class="form-text text-muted">Votre addresse mail nous servira principalement à vous identifier et à retrouver votre compte si vous oubliez vos informations de connexion.</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input
                            v-model="password"
                            type="password"
                            id="password"
                            class="form-control"
                            autocomplete="current-password">
                    </div>
                    <button type="submit" class="btn btn-primary">Connexion</button>
                    <router-link :to="'/inscription'" class="btn btn-dark">Inscription</router-link>
                    <small class="form-text text-muted">Vous avez oublié votre mot de passe ? Cliquez-ici pour le changer !</small>
                </form>
            </main>
        </section>
    </div>
</template>

<script>
// API
import { RepositoryFactory } from "~/api/repositories"
const Users = RepositoryFactory.get('users')

export default {
    name: 'login-page',
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            errors: {
                login: ""
            }
        }
    },
    methods: {
        async logUser(e) {
            e.preventDefault()

            Users.login({
                "mail": this.email,
                "password": this.password
            })
            .then(v => {
                let user = v.data.user
                this.$cookies.set("U_", user, 60 * 60 * 24 * 30)
                this.$store.commit('loginSucceed', user)
                this.$router.push('/profil')
            })
            .catch(() => {
                this.$store.commit('loginFailed')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    min-height: calc(100vh - 56px);
    main {
        width: 600px;
        .title {
            font-size: 5rem;
            font-weight: 700;
            text-align: center;
        }
    }
}
@media only screen and (max-width: 600px) {
    .title {
        font-size: 3.5rem;
    }
}
</style>