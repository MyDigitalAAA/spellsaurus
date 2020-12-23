<template>
  <div
    v-if="user"
    class="container-fluid p-4"
    id="spell-container"
  >
    <h2 class="display-3 font-display mb-3">
      <span class="username">{{ user.name }}</span>
      <span
        v-if="user.verified"
        class="verified"
      >
        <i class="mad">check_circle</i>
      </span>
    </h2>

  </div>
</template>

<script>

export default {
  name: 'profile-page',
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserProfile
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