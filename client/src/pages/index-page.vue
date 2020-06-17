<template>
  <div class="container-fluid" id="index-container">
    <section class="fullpage">
      <div class="px-4">
        <h1 class="text-dark mb-4 font-display line-height-100 font-weight-900">"C'est magique, ta gueule."</h1>
        <div class="lead font-display font-weight-bold">— N'importe quel MJ, une fois dans sa vie</div>
        <hr class="w-50">
        <div class="lead"><span class="font-display" style="font-weight:700;">Auracle</span> est une base de données publique en ligne pour sortilèges, en soutien au jeu de rôle sur table <span class="font-weight-bold text-secondary">Leïm</span>.</div>
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
    .fullpage {
        min-height: calc(100vh - 56px);
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
            font-size: 5rem;
        }
    }
    @media only screen and (max-width: 600px) {
        .fullpage {
            h1 {
                font-size: 3.5rem;
            }
        }
    }
</style>