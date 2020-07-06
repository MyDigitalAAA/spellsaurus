<template>
    <div class="container-fluid p-4" id="spell-container">
        <h1 class="display-3 font-display mb-3">{{ user.name }}</h1>
    </div>
</template>

<script>
export default {
    name: 'profile-page',
    data() {
        return {
            user: this.$cookies.get("U_"),
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