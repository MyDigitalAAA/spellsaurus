<template>
    <nav class="navbar navbar-dark">
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

<style lang="scss">

    nav {
        width: 100%;
        position: fixed;
        top: 0;
        padding-left: 2rem;

        ul {
            display: flex;
            li {
                a {
                    position: relative;
                    margin-right: 1rem;
                    padding: 1.5rem;
                    display: block;
                    font-size: .83rem;
                    font-weight: $font-bold;
                    text-transform: uppercase;
                    text-shadow: none;
                    transition: text-shadow .5s cubic-bezier(0.645, 0.045, 0.355, 1);
                    
                    &:after {
                        position: absolute;
                        display: block;
                        left: 50%;
                        bottom: 0;
                        transform: translateX(-50%);
                        width: 0;
                        height: 3px;
                        content: '';
                        box-shadow: none;
                        transition: width .5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow .5s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }

                    &:hover,
                    &.router-link-exact-active {
                        @include blue-glow-text(.5);
                        &:after {
                            width: 80%;
                            transition: width .5s cubic-bezier(0.645, 0.045, 0.355, 1);
                            @include blue-glow-box(.5);
                        }
                    }
                }
            }
        }

        &.navbar-light {
            ul {
                li {
                    a {
                        color: $black;
                        &:after {
                            background: $black;
                        }
                    }
                }
            }
        }
        &.navbar-dark {
            ul {
                li {
                    a {
                        color: $white;
                        &:after {
                            background: $white;
                        }
                    }
                }
            }
        }
    }
</style>
