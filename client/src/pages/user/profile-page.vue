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

    <ul class="nav nav-tabs mt-3 mb-3" id="tabs-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="tabs-home-tab" data-toggle="pill" href="#tabs-home" role="tab" aria-controls="tabs-home" aria-selected="true">Mes sorts</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="tabs-contact-tab" data-toggle="pill" href="#tabs-contact" role="tab" aria-controls="tabs-contact" aria-selected="false">Paramètres</a>
      </li>
    </ul>
    <div class="tab-content" id="tabs-tabContent">
      <div class="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">...</div>
      <div class="tab-pane fade" id="tabs-contact" role="tabpanel" aria-labelledby="tabs-contact-tab">
        <update-form :user="user"/>
      </div>
    </div>

  </div>
</template>

<script>

import UpdateForm from '~/components/user/profile/update-form.vue'

export default {
  name: 'profile-page',
  metaInfo: {
    titleTemplate: '%s - Profil'
  },
  components: {
    UpdateForm,
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