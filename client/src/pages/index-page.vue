<template>
    <div class="home-page">
        <section class="landing">
            <div class="splash-title">
                <h1>Auracle</h1>
                <div>
                    <p>Recueil de savoirs arcaniques et ésotériques des contrées lointaines de Léïm</p>
                    <p>Découvrez ses sortilèges et maléfices...</p>
                </div>
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
    .home-page {
        .landing {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: $dull--black;

            .splash-title {
                padding-bottom: 1rem;
                color: $white;
                text-align: center;
                @include blue-glow-text(.8);

                h1 {
                    margin-bottom: 1.5rem;
                    font-size: 4rem;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: $font-bold;
                    text-transform: uppercase;
                }

                div {
                    padding-top: 1rem;
                    p {
                        margin-bottom: 1.5rem;
                        font-size: 1.2rem;
                        font-style: italic;
                    }
                }

            }

        }
    }
</style>