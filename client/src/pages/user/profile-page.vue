<template>
    <div class="container-fluid">
        <section class="fullpage">
            <div class="title font-display mb-3">Profil</div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'profile-page',
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