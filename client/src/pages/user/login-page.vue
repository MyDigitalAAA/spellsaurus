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
              :class="{
                'is-invalid': errors.mailEmpty || errors.login,
                'is-valid': submitted && !errors.mailEmpty }"
              placeholder="john.doe@gmail.com"
              autocomplete="email">

            <small
              v-if="!errors.mailEmpty"
              class="form-text text-muted"
            >
              Votre addresse mail nous servira principalement à vous identifier et à retrouver votre compte si vous oubliez vos informations de connexion.
            </small>
            <small
              v-if="errors.mailEmpty"
              class="form-text text-danger"
            >
              Veuillez renseigner une adresse mail.
            </small>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              :class="{
                'is-invalid': errors.passwordEmpty || errors.login,
                'is-valid': submitted && !errors.passwordEmpty }"
              autocomplete="current-password">
            <small
              v-if="!errors.passwordEmpty"
              class="form-text text-muted"
            >
              Nous vous conseillons d'utiliser un mot de passe unique pour cette application seulement.
            </small>
            <small
              v-if="errors.passwordEmpty"
              class="form-text text-danger"
            >
              Veuillez renseigner un mot de passe.
            </small>
          </div>

          <div class="form-check">
            <input
              type="checkbox"
              v-model="remember_me"
              id="remember-me"
              class="form-check-input">
            <label
              class="form-check-label"
              for="remember-me"
            >
              Rester connecté
            </label>
          </div>

          <div class="form-group">
            <small v-if="errors.login" class="text-danger">{{ errors.login }}</small>
          </div>

          <button type="submit" class="btn btn-primary">Connexion</button>
          <router-link :to="'/inscription'" class="btn btn-dark">Inscription</router-link>
          <small class="form-text text-muted">Mot de passe oublié ? <a href="#">Vous pouvez le changer ici !</a></small>

        </form>
      </main>
    </section>
  </div>
</template>

<script>

export default {
    name: 'login-page',
    data() {
      return {
        email: "",
        password: "",
        remember_me: false,
        submitted: false,

        errors: {
          mailEmpty: "",
          passwordEmpty: "",
          login: "",
        }
      }
    },
    methods: {
      async logUser(e) {

        this.submitted = true;

        this.errors = this.resetErrors();

        let userInput = {
          "mail": this.email,
          "password": this.password
        };

        if (this.email && this.password) {
          this.$store.dispatch('user_login', userInput)
            .then(() => {
              this.$router.push('/profil');
            })
            .catch(() => {
              this.errors.login = "Erreur d'authentification. Les identifiants ne correspondent pas."
            });
        } else {
          if (!userInput.mail) {
            this.errors.mailEmpty = "Veuillez entrer une addresse mail valide."
          }
          if (!userInput.password) {
            this.errors.passwordEmpty = "Veuillez entrer un mot de passe."
          }
        }

        e.preventDefault();
      },
      resetErrors() {
        return {
          mailEmpty: "",
          passwordEmpty: "",
          login: "",
        }
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
  section {
    main {
      .title {
        font-size: 3.5rem;
      }
    }
  }
}

</style>