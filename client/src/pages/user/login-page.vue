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
                'is-invalid': errors.email || errors.login,
                'is-valid': submitted && !errors.email }"
              placeholder="john.doe@gmail.com"
              autocomplete="email">

            <small
              v-if="!errors.email"
              class="form-text text-muted"
            >
              Votre addresse mail nous servira principalement à vous identifier et à retrouver votre compte si vous oubliez vos informations de connexion.
            </small>
            <small
              v-if="errors.email"
              class="form-text text-danger"
            >
              {{ errors.email }}
            </small>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password || errors.login }"
              autocomplete="current-password">
            <small
              v-if="!errors.password"
              class="form-text text-muted"
            >
              Nous vous conseillons d'utiliser un mot de passe unique pour cette application seulement.
            </small>
            <small
              v-if="errors.password"
              class="form-text text-danger"
            >
              {{ errors.password }}
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
          email: "",
          password: "",
          login: "",
        }
      }
    },
    methods: {
      async logUser(e) {
        e.preventDefault();

        // Resets old errors if any
        for (const o in this.errors) {
          this.errors[o] = ""
        }
        this.submitted = true;

        let userInput = {
          "mail": this.email,
          "password": this.password
        };

        if (!userInput.mail) {
          this.errors.email = "Vous devez renseigner une addresse mail."
        }
        if (!userInput.password) {
          this.errors.password = "Vous devez renseigner un mot de passe."
        }

        // Stops the method if any errors exist
        for (const o in this.errors) {
          if (this.errors[o] != "") {
            this.submitted = false;
          }
        }

        if (this.submitted) {
          this.$store.dispatch('user_login', userInput)
            .then(() => {
              this.$router.push('/profil')
            })
            .catch(err => {
              if (err.status === 404) {
                this.errors.email = err.data.error;
              } else {
                this.errors.login = "Une erreur inconnue est survenue, rééssayez plus tard.";
              }
            });
        }
      },
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