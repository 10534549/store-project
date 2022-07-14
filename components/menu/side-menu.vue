<template>
    <div class="sidenavbar for-desk">
        <nav class="nav nav-pills flex-column">
            <div class="bg-light text-center pt-2 pb-3">
                <div class="smart-deal-offer-logo px-4">
                    <nuxt-link to="profile">
                        <b-img :src="img" alt="logo" class="logo-section" />
                    </nuxt-link>
                </div>
            </div>
            <div class="menu-content">
                <div v-for="navigation in navigations" :key="navigation.key">
                    <nuxt-link :to="navigation.link">
                        <div class="nav-link">{{ navigation.name }}</div>
                    </nuxt-link>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import logoImg from '~/assets/img/static/logo.png'
export default {
    data() {
        return {
            img: logoImg,
            navigations: [
                // {
                //     name: 'Dashboard',
                //     link: '/dashboard',
                // },
                {
                    name: 'Profile',
                    link: '/profile',
                },
                {
                    name: 'My Offers',
                    link: '/my-offers',
                },
                {
                    name: 'My Deals',
                    link: '/my-deals',
                },
                {
                    name: 'Products',
                    link: '/products',
                },
                {
                    name: 'Transactions',
                    link: '/transactions',
                },
                {
                    name: 'Support',
                    link: '/support',
                },
                {
                    name: 'Geofence History',
                    link: '/geofence-history',
                },
                {
                    name: 'Notifications',
                    link: '/notifications',
                },
            ],
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.sidenavbar {
    position: fixed;
    top: 0;
    min-height: 100vh;
    background: $dark-grey;
    width: 225px;
    line-height: 2.5;
    .smart-deal-offer-logo {
        margin: 0px auto;
        width: 80%;
        .logo-section {
            width: 100%;
            height: 100%;
        }
    }
    .menu-content {
        .nuxt-link-active {
            .nav-link {
                background: $active-grey;
                color: $black;
            }
        }
        a {
            text-decoration: none;
            .nav-link {
                background: transparent;
                border-radius: 0;
                color: $white;
                border-bottom: 1px solid $active-grey;
                &:hover {
                    text-decoration: none;
                    background: $light-grey;
                    color: $dark-grey;
                }
            }
        }
    }
}
</style>
