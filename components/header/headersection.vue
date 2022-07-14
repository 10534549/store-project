<template>
    <div class="main-header bg-light">
        <div class="border-bottom border-left for-desk">
            <b-nav small>
                <div class="d-flex ml-auto">
                    <b-nav-item class="border-right icon-size bell-position">
                        <div class="icon-colour">
                            <font-awesome-icon
                                :icon="['fas', 'bell']"
                                @click="openNotification()"
                            ></font-awesome-icon>
                            <div class="badge-notify">
                                <b-badge>
                                    {{ notificationCounts }}
                                    <span class="sr-only">unread messages</span>
                                </b-badge>
                            </div>
                        </div>
                    </b-nav-item>

                    <!-- Store Admin Details -->
                    <b-nav-item class="border-right">
                        <div
                            v-if="!hideProfile"
                            class="store-admin font-22 px-3 pointer"
                            @click="login"
                        >
                            Login
                        </div>
                        <div
                            v-if="hideProfile"
                            class="store-admin d-flex align-items-center icon-colour"
                        >
                            <div class="profile-holder">
                                <img
                                    :src="
                                        formData.profileImage
                                            | imageRender('photograph.png')
                                    "
                                    :alt="formData.name"
                                    class="img-fluid border border-light rounded-circle"
                                />
                            </div>
                            <div>
                                <div class="store-admin-details mx-2">
                                    {{ formData.name }}
                                </div>
                            </div>
                            <div>
                                <b-dropdown id="profile" right variant="light">
                                    <b-dropdown-item to="/profile"
                                        >Profile</b-dropdown-item
                                    >
                                    <b-dropdown-item
                                        >Marked As Favourite ({{
                                            storeDetails
                                        }})</b-dropdown-item
                                    >
                                    <b-dropdown-item>
                                        <div @click="logOut">
                                            Log Out
                                        </div>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </b-nav-item>
                </div>
            </b-nav>
        </div>

        <!-- for mobile  -->
        <div class="disp-flex for-mob mobile-header ">
            <div class="header"></div>
            <input
                id="openSidebarMenu"
                type="checkbox"
                class="openSidebarMenu"
            />
            <label for="openSidebarMenu" class="sidebarIconToggle">
                <div class="spinner diagonal part-1"></div>
                <div class="spinner horizontal"></div>
                <div class="spinner diagonal part-2"></div>
            </label>
            <div class="smart-deal-offer-logo">
                <nuxt-link to="profile">
                    <b-img :src="logo" alt="logo" class="logo-section" />
                </nuxt-link>
            </div>
            <div class="d-flex profile-info">
                <b-nav-item class="icon-size bell-position">
                    <div class="icon-colour">
                        <font-awesome-icon
                            :icon="['fas', 'bell']"
                            @click="openNotification()"
                        ></font-awesome-icon>
                        <div class="badge-notify">
                            <b-badge>
                                {{ notificationCounts }}
                                <span class="sr-only">unread messages</span>
                            </b-badge>
                        </div>
                    </div>
                </b-nav-item>
                <!-- Store Admin Details -->
                <b-nav-item class="">
                    <div
                        v-if="!hideProfile"
                        class="store-admin font-22 px-3 pointer"
                        @click="login"
                    >
                        Login
                    </div>
                    <div
                        v-if="hideProfile"
                        class="store-admin d-flex align-items-center icon-colour"
                    >
                        <div class="profile-holder">
                            <img
                                :src="
                                    formData.profileImage
                                        | imageRender('photograph.png')
                                "
                                :alt="formData.name"
                                class="img-fluid border border-light rounded-circle"
                            />
                        </div>
                        <!-- <div>
                            <div class="store-admin-details mx-2">
                                {{ formData.name }}
                            </div>
                        </div> -->
                        <div>
                            <b-dropdown id="profile" right variant="light">
                                <b-dropdown-item to="/profile"
                                    >Profile</b-dropdown-item
                                >
                                <b-dropdown-item>
                                    Marked As Favourite ({{ storeDetails }})
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <div @click="logOut">Log Out</div>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </b-nav-item>
            </div>
            <div id="sidebarMenu">
                <ul class="sidebarMenuInner">
                    <li v-for="navigation in navigations" :key="navigation.key">
                        <nuxt-link :to="navigation.link">
                            <div class="nav-link">
                                {{ navigation.name }}
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- End  -->
    </div>
</template>
<script src="https://wchat.freshchat.com/js/widget.js"></script>
<script>
import nuxtStorage from 'nuxt-storage'
import service from '@/service/apiService'
import global from '@/service/global'
import userImage from '~/assets/img/dynamic/user.jpg'
import logoImg from '~/assets/img/static/logo.png'

export default {
    data() {
        return {
            logo: logoImg,
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
                    name: 'My Products',
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

            img: userImage,
            hideProfile: false,
            formData: {
                profileImage: '',
            },
            storeId: {
                id: global.getStore(),
            },
            storeDetails: {},
            notificationCounts: '',
        }
    },
    mounted() {
        this.getOneStore()
        if (global.getUser()) {
            this.hideProfile = true
            this.getNotification()
            const accessToken = global.getUser()
            service.getOneUser(accessToken, (result) => {
                if (result) {
                    this.formData = result.data
                    this.formData.profileImage = result.data.profileImage
                    const obj = {}
                    obj.userName = result.data.name
                    obj.email = result.data.email
                    obj.restoreId = result.data.restoreId
                    global.setUserDetail(obj)
                    const restoreId = global.getUserDetail().restoreId
                    window.fcWidget.init({
                        token: global.freshChatWidgetToken,
                        host: global.freshChatUrl,
                        externalId: global.getUserDetail().email,
                        restoreId: restoreId ? restoreId : null,
                    })
                    window.fcWidget.user.get(function(resp) {
                        let status = resp && resp.status,
                            data = resp && resp.data
                        if (status !== 200) {
                            window.fcWidget.user.setProperties({
                                firstName: global.getUserDetail().userName,
                                lastName: '',
                                email: global.getUserDetail().email,
                                // phone: '8693876476', // phone number without country code
                                // phoneCountryCode: '+91', // phone's country code
                                plan: 'Estate', // user's meta property 1
                                status: 'Active', // user's meta property 2
                            })
                            window.fcWidget.on('user:created', function(resp) {
                                let status = resp && resp.status,
                                    data = resp && resp.data
                                if (status === 200) {
                                    if (data.restoreId) {
                                        service.updateUserByToken(
                                            data,
                                            (result) => {
                                                if (result.status === 200) {
                                                } else {
                                                }
                                            },
                                        )
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.formData.profileImage = ''
                }
            })
        } else {
            this.hideProfile = false
        }
    },
    methods: {
        login() {
            service.login(global.userRedirectUrl)
        },
        getOneStore() {
            const accessToken = global.getUser()
            service.getOneStore(this.storeId, accessToken, (data) => {
                this.storeDetails = data.data.followers
            })
        },
        getNotification() {
            service.getOneUserAndNotification((data) => {
                this.notificationCounts = data.data.notificationCount
                this.formData = data.data.user
            })
        },
        logOut() {
            nuxtStorage.localStorage.clear()
            service.logout((data) => {
                this.$router.push('/')
            })
        },
        openNotification() {
            service.seenNotification((result) => {
                this.getNotification()
                this.$router.push('/notifications')
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.disp-flex{
    display: flex;
}
.v-application--wrap {
    min-height: unset !important;
}
.smart-deal-offer-logo {
    margin: 0px auto;
    width: 80%;
    .logo-section {
        width: 100%;
        height: 100%;
    }
}
.main-header {
    .store-admin {
        color: $black;
    }
    .icon-colour {
        color: $dark-grey;
    }
    .icon-size {
        font-size: $font-16;
        padding: 5px 5px;
    }
    .ellipsis-icon {
        border: 1px solid $orange;
        background: $orange;
        border-radius: 5px;
        color: $white;
        width: 30px;
    }
    .bell-position {
        position: relative;
    }
    .badge-notify {
        background-color: $orange;
        position: absolute;
        background: $orange;
        border-radius: 17px;
        color: $white;
        bottom: 55%;
        left: 50%;
        font-size: $font-10;
        .badge-secondary {
            background: transparent;
            font-size: $font-12;
        }
    }
    .profile-holder {
        width: 38px;
    }
}

// Hamburger menu

.header {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
    // position: fixed;
    height: 60px !important;
    overflow: hidden;
    z-index: 10;
}
.main {
    margin: 0 auto;
    display: block;
    height: 100%;
    margin-top: 60px;
}
.mainInner {
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
}
.mainInner div {
    display: table-cell;
    vertical-align: middle;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 1.25px;
}
#sidebarMenu {
    height: 100%;
    position: fixed;
    left: 0;
    width: 250px;
    top: 72px;
    z-index: 99999;
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
    background: $dark-grey;
}
.sidebarMenuInner {
    margin: 0;
    padding: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.sidebarMenuInner li {
    list-style: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.sidebarMenuInner li span {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
}
.sidebarMenuInner li a {
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}
input[type='checkbox']:checked ~ #sidebarMenu {
    transform: translateX(0);
}

input[type='checkbox'] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
}
.sidebarIconToggle {
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    height: 100%;
    width: 100%;
    top: 30px;
    left: 15px;
    height: 22px;
    width: 22px;
}
.spinner {
    transition: all 0.3s;
    box-sizing: border-box;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #000;
}
.horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}
.diagonal.part-1 {
    position: relative;
    transition: all 0.3s;
    box-sizing: border-box;
    float: left;
}
.diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    opacity: 0;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .diagonal.part-1 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(135deg);
    margin-top: 8px;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: -9px;
}

.mobile-header {
    position: fixed;
    width: 100%;
    z-index: 9999;
    background: #f8f9fa;
    padding: 5px 0px;
    .profile-info {
        align-items: center;

        li {
            list-style: none;
        }
    }
}
</style>
