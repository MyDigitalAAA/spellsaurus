<template>
  <div class="container-fluid p-4" id="spell-container">
    <div class="display-3 font-display mb-3">
      <span class="username">{{ user_token }}</span>
      <!-- <span v-if="user.verified" class="verified"><i class="mad">check_circle</i></span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-page',
  computed: {
    user_token() {
      return this.$store.getters.getUserToken
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