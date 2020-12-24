<template>
  <div
    v-if="user"
    class="container-fluid p-4"
    id="spell-container"
  >
    <h2 class="display-3 font-display mb-3">
      <span class="username">{{ user.name }}</span>
    </h2>
    <span>Membre depuis le {{ registered_date }}</span>

  </div>
</template>

<script>

export default {
  name: 'profile-page',
  metaInfo: {
    titleTemplate: '%s - Profil'
  },
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserProfile
    },
    registered_date() {
      let raw_date = new Date(this.user.register_date);

      let date_options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      return new Intl.DateTimeFormat("fr", date_options).format(raw_date);
    }
  },
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