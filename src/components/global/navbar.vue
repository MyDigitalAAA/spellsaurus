<template>
    <nav>
        <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Sorts</a></li>
            <li><a href="#">Personnages</a></li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    nav {
        padding: 1.5rem 2.5rem;
        font-size: .9rem;
        color: $white;
        background: $black;
        text-transform: uppercase;
        box-shadow: 0 0 .5rem rgba($black, .75);
        ul {
            display: flex;
            li {
                margin-right: 2.5rem;
            }
        }
    }
</style>