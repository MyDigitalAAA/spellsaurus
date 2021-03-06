<template>
  <div class="container-fluid">
    <section class="d-flex justify-content-center align-items-center">
      <main>
        <div class="title font-display mb-3">Inscription</div>
        <form @submit="registerUser">

          <div class="form-group">
            <label for="email">Nom d'utilisateur</label>
            <input
              v-model="name"
              :class="{
                'is-invalid': errors.name,
                'is-valid': submitted && !errors.name }"
              type="text"
              id="username"
              class="form-control"
              placeholder="John Doe"
              autocomplete="username">
            <small
              v-if="!errors.name"
              class="form-text text-muted"
            >
              Vous pouvez changer votre pseudo à tout moment.
            </small>

            <small
              v-if="errors.name"
              class="form-text text-danger"
            >
              {{ errors.name }}
            </small>
          </div>

          <div class="form-group">
            <label for="email">Adresse mail</label>
            <input
              v-model="email"
              :class="{
                'is-invalid': errors.email,
                'is-valid': submitted && !errors.email }"
              type="email"
              id="email"
              class="form-control"
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
              :class="{
                'is-invalid': errors.password,
                'is-valid': submitted && !errors.password }"
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              autocomplete="password">
          </div>

          <div class="form-group">
              <label for="password_check">Confirmer le mot de passe</label>
              <input
                v-model="password_check"
                :class="{
                    'is-invalid': errors.password_check || errors.password,
                    'is-valid': submitted && !errors.password_check}"
                type="password"
                id="password_check"
                class="form-control"
                autocomplete="password-verification">
              <small
                v-if="!errors.password && !errors.password_check"
                class="form-text text-muted"
              >
                Votre mot de passe doit idéalement contenir des symboles ainsi que des lettres et des chiffres.
              </small>

              <small
                v-if="errors.password"
                class="form-text text-danger"
              >
                {{ errors.password }}
                </small>
              <small
                v-if="errors.password_check"
                class="form-text text-danger"
              >
                {{ errors.password_check }}
              </small>
          </div>

          <div class="form-group">
            <small v-if="errors.register" class="text-danger">{{ errors.register }}</small>
          </div>

          <button type="submit" class="btn btn-dark">Inscription</button>
        </form>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register-page',
  metaInfo: {
    titleTemplate: '%s - Inscription'
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_check: "",
      submitted: false,
      errors: {
        name: "",
        email: "",
        password: "",
        password_check: "",
        register: "",
      },
    }
  },
  methods: {
    async registerUser(e) {
      e.preventDefault();

      // Resets old errors if any
      for (const o in this.errors) {
        this.errors[o] = ""
      }
      this.submitted = true;

      let userInput = {
        "user": {
          "name": this.name,
          "mail": this.email,
          "password": this.password
        }
      }

      // Check if all inputs are valid without sending anything
      if (!userInput.user.name) {
        this.errors.name = "Vous devez renseigner un pseudonyme."
      }
      if (!userInput.user.mail) {
        this.errors.email = "Vous devez renseigner une addresse mail."
      }
      if (!userInput.user.password) {
        this.errors.password = "Vous devez renseigner un mot de passe."
      }
      if ((userInput.user.password.localeCompare(this.password_check)) != 0) {
        this.errors.password_check = "Les mots de passe ne correspondent pas."
      }

      // Stops the method if any errors exist
      for (const o in this.errors) {
        if (this.errors[o] != "") {
          this.submitted = false;
        }
      }

      // If no errors are present, submits the form
      if (this.submitted) {
        this.$store.dispatch('user_register', userInput)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            // Sets errors in case something wrong comes back from the API
            if (err.status === 409) {
              this.errors.email = err.data.error;
            } else {
              this.errors.register = "Une erreur inconnue est survenue, rééssayez plus tard.";
            }
          });
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
    .title {
        font-size: 3.5rem;
    }
}
</style>