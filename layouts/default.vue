<template>
    <v-app>
        <div class="bg-section">
            <div class="container-section">
                <headerSection></headerSection>
                <nuxt />
                <sideMenu></sideMenu>
            </div>
        </div>
    </v-app>
</template>
<script>
import headerSection from '@/components/header/headersection.vue'
import sideMenu from '@/components/menu/side-menu.vue'
export default {
    components: {
        headerSection,
        sideMenu,
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables';
body {
    font-family: $open-sans-regular, sans-serif;
    font-size: $font-14;
    color: $dark-grey;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
.v-application--wrap {
    min-height: unset !important;
}
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
.bg-section {
    background: $silver;
    min-height: 100vh;
}
</style>
