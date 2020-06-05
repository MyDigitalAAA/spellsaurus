<template>
  <div class="container-fluid" id="index-container">
    <section class="fullpage">
      <div class="px-4">
        <div class="text-dark mb-4 font-display line-height-100 font-weight-900" style="font-size:96px;">"C'est magique, ta gueule."</div>
        <div class="lead font-display font-weight-bold">— N'importe quel MJ, une fois dans sa vie</div>
        <hr class="w-50">
        <div class="lead"><span class="font-display" style="font-weight:700;">Auracle</span> est une base de données publique en ligne pour sortilèges, en soutien au jeu de rôle sur table <span class="font-weight-bold text-secondary">Leïm</span>.</div>
        <!--<a class="mt-4 btn btn-primary btn-lg font-display text-uppercase" href="/register" role="button" style="font-weight:800;">Create a free account</a>-->
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'index',
}
</script>

<style lang="scss">
  .fullpage{
    min-height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>