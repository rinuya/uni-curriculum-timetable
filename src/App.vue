<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            hamburgerIsOpen: false
        }
    },
    methods: {
        toggleHamburgerMenu() {
            this.hamburgerIsOpen = !this.hamburgerIsOpen
        }
    }
}
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <RouterLink to="/">
                    <a class="navbar-item">
                        <p class="heading subtitle has-text-primary ml-2 pt-2">UniCurTT</p>
                    </a>
                </RouterLink>
                <a
                    @click="toggleHamburgerMenu"
                    role="button"
                    :class="{ 'is-active': hamburgerIsOpen }"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasic"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasic" :class="{ 'is-active': hamburgerIsOpen }" class="navbar-menu">
                <div class="navbar-start">
                    <RouterLink to="/" class="navbar-item"> Home </RouterLink>

                    <RouterLink to="/all-courses" class="navbar-item"> All Courses </RouterLink>

                    <RouterLink to="/create-timetable" class="navbar-item">
                        Create Timetable
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
    <div class="container">
        <RouterView />
    </div>
</template>

<style scoped>
.nav-item {
    font-size: large;
    margin-right: 24px;
}
</style>
