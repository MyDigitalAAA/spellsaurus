<template>
    <nav>
        <ul v-if="links.length != 0">
            <li v-for="(link, index) in links" :key="index">
                <router-link v-bind:to="link.url">{{ link.text }}</router-link>
            </li>
        </ul>
    </nav>
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
            ]
        }
    }
}
</script>

<style lang="scss">
    nav {
        padding-left: 2rem;
        font-size: .9rem;
        color: $black;
        background: $white;
        text-transform: uppercase;
        // box-shadow: 0 0 .5rem rgba($black, .75);
        ul {
            display: flex;
            li {
                a {
                    position: relative;
                    margin-right: 1rem;
                    padding: 1.5rem;
                    display: block;
                    &:after {
                        position: absolute;
                        display: block;
                        left: 50%;
                        bottom: 0;
                        transform: translateX(-50%);
                        width: 0;
                        height: 3px;
                        content: '';
                        background: $black;
                        transition: width .5s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }
                    &:hover {
                        &:after {
                            width: 80%;
                            transition: width .5s cubic-bezier(0.645, 0.045, 0.355, 1);
                        }
                    }
                }
            }
        }
    }
</style>
