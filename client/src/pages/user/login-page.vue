<template>
    <div class="container-fluid">
        <section class="fullpage">
            <div>
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
                    <button type="submit" class="btn btn-dark">Connexion</button>
                </form>
            </div>
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
                let user = v.data
                this.$cookies.set("loggedUser", user, 60 * 60 * 24 * 30)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 5rem;
    font-weight: 700;
}
@media only screen and (max-width: 600px) {
    .title {
        font-size: 3.5rem;
    }
}
</style>