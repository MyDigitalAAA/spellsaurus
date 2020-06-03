<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand font-display font-weight-700" href="#">Auracle</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" v-if="links.length != 0">
          <li class="nav-item" v-for="(link, index) in links" :key="index">
            <router-link v-bind:to="link.url" class="nav-link">{{ link.text }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
    <!--<nav class="navbar navbar-dark">
        <ul v-if="links.length != 0">
            <li v-for="(link, index) in links" :key="index">
                <router-link v-bind:to="link.url">{{ link.text }}</router-link>
            </li>
        </ul>
    </nav>-->
</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {
                links: [
                    {
                        id: 0,
                        text: 'Accueil',
                        url: '/',
                    },
                    {
                        id: 1,
                        text: 'Sortilèges',
                        url: '/spells',
                    },
                    {
                        id: 2,
                        text: 'Monde',
                        url: '/world',
                    },
                ]
            }
        }
    }
</script>

<style lang="scss"></style>
