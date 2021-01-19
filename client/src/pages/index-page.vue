<template>
  <div class="container-fluid">
    <section class="d-flex justify-content-center align-items-center">
      <main class="px-4">
        <h1 class="title text-dark mb-4 font-display font-weight-black line-height-100">"C'est magique, ta gueule."</h1>
        <div class="lead font-display font-weight-bold">— N'importe quel MJ, une fois dans sa vie</div>
        <hr class="w-50">
        <div class="lead">
          <span class="font-display font-weight-bold">Auracle</span> est une base de données publique en ligne pour sortilèges, en soutien au jeu de rôle sur table <span class="font-weight-bold text-secondary">Leïm</span>.
        </div>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'index-page',
}
</script>

<style lang="scss" scoped>
section {
  min-height: calc(100vh - 56px);
  main {
    width: 1000px;
    .title {
      color: $white;
      font-size: 64px;
      text-align: center;
    }
  }
}
@media only screen and (max-width: $bp-md) {
  section {
    main {
      .title {
        font-size: 48px;
      }
    }
  }
}
</style>