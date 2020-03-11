<template>
    <article class="spell-card">
        <div class="content">
            <header>
                <h3>{{ name }}</h3>
            </header>
            <section class="casting-header">
                <div class="casting-infos">
                    <div class="type">
                        <div class="level">
                            <div class="label">
                                <span>LV.</span>
                                <br>
                                <span>MIN</span>
                            </div>
                            <var>{{ level }}</var>
                        </div>
                        <ul class="schools">
                            <li v-for="school of schools" :key="school">
                                {{ school }}
                            </li>
                        </ul>
                    </div>
                    <div class="cost">
                        <span class="label">Malus</span>
                        <var>{{ cost }}</var>
                    </div>
                    <div class="charge">
                        <span class="label">Charge</span>
                        <var>{{ charge }}</var>
                    </div>
                </div>
                <div class="casting-ingredients">
                    <p class="title">Nécessite</p>
                    <p class="content">
                        {{ ingredients }}
                    </p>
                </div>
            </section>
            <hr>
            <section class="spell-description">
                <p v-for="line of description" :key="line">
                    {{ line }}
                </p>
            </section>
            <hr>
            <footer v-if="variables">
                <div class="label">Variables</div>
                <div class="variables">
                    <div v-for="variable in variables" :key="variable" class="xyz">
                        <span>{{ variable.name }}</span>
                        <var>{{ variable.description }}</var>
                    </div>
                </div>
            </footer>
        </div>
    </article>
</template>

<script>
export default {
    name: "spell-card",
    props: {
        name: String,
        description: Array,
        level: String,
        schools: Array,
        ingredients: String,
        charge: String,
        cost: String,
        variables: Array,
    }
}
</script>

<style lang="scss">

    .spell-card {
        max-width: 35rem;
        padding: .5rem;
        margin: .5rem auto .5rem;
        background: $card-border-inner;
        border: solid 1px rgba($dark-blue, .5);
        border-radius: .5rem;
        box-shadow: .0 .0 .75rem rgba($dark-blue, .25);

        > .content {
            max-width: 35rem;
            height: 100%;
            padding: .75rem;
            background: $white;

            header {
                h3 {
                    padding: .5rem;
                    text-align: center;
                    color: $white;
                    text-transform: uppercase;
                    background: $black;
                }
            }

            .casting-header {
                display: flex;
                > * {
                    width: 50%;
                }

                .casting-infos {
                    margin: .75rem 0;
                    padding-right: .75rem;
                    border-right: 1px solid rgba($black, .25);
                    .type {
                        margin-bottom: .5rem;
                        display: flex;
                        > * {
                            width: 50%;
                        }
                        .level {
                            .label {
                                margin-right: .25rem;
                                display: inline-block;
                            }
                            var {
                                display: inline-block;
                                font-size: 2.3em;
                            }
                        }
                    }
                    .cost, .charge {
                        font-size: 0.9rem;
                        > * {
                            vertical-align: middle;
                        }
                        .label {
                            display: inline-block;
                            width: 30%;
                            text-transform: uppercase;
                        }
                        var {
                            display: inline-block;
                        }
                    }
                }

                .casting-ingredients {
                    margin: .75rem 0;
                    padding-left: .75rem;
                    .title {
                        margin-bottom: .25rem;
                        font-size: .9rem;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .content {
                        padding-top: 1rem;
                        font-size: .85rem;
                        text-align: justify;
                        text-align-last: center;
                    }
                }
            }

            .spell-description {
                padding: .75rem 0;
                font-size: .85rem;
                p {
                    &:not(:last-of-type) {
                        margin-bottom: .5rem;
                    }
                }
            }

            footer {
                padding: .75rem 0 0;
                display: flex;
                align-items: center;
                .label {
                    margin-right: 1rem;
                }
                .variables {
                    .xyz {
                        span {
                            font-size: 1.1rem;
                            font-weight: bold;
                            margin-right: 1rem;
                        }
                    }
                }
            }

        }

    }

</style>