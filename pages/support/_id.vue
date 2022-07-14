<template>
    <div class="support-inside-section main-content">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div>
                <div class="title text-uppercase">{{ title }}</div>
            </div>
        </div>
        <!-- title section end -->
        <!-- support inside content start -->
        <div class="support-inside-content p-3 font-12">
            <div class="d-flex justify-content-between p-2 bg-light-grey">
                <div>
                    <div class="open-sans-semi-bold font-16">
                        Ticket: {{ ticket.id }}
                    </div>
                    <div class="font-10">
                        {{ ticket.created_at | moment('Do MMMM , YYYY ') }}
                    </div>
                </div>
                <div>
                    <div>
                        <span>Status:</span>
                        <span class="open-sans-bold">{{
                            ticket.status | freshDeskStatus
                        }}</span>
                    </div>
                    <!-- <div class="mark-btn">
                        <b-button
                            class="btn-sm shadow-none"
                            variant="outline-primary"
                            >Marked Closed
                        </b-button>
                    </div> -->
                </div>
            </div>
            <div class="chat-reply-section">
                <div class="mb-2" v-html="conversations"></div>
            </div>
        </div>
        <!-- support inside content end -->
    </div>
</template>
<script>
import service from '@/service/apiService'
export default {
    middleware: 'authenticationGuard',

    data() {
        return {
            conversations: '',
            ticket: {},
            title: 'support',
        }
    },
    mounted() {
        this.viewConversations()
    },
    methods: {
        viewConversations() {
            service.allChatByIdinSupport(this.$route.params.id, (result) => {
                this.ticket = result
                this.conversations = result.description
            })
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.chat-reply-section {
    img {
        visibility: hidden;
    }
}
.support-inside-section {
    .support-inside-content {
        .mark-btn {
            .btn-outline-primary {
                color: $black;
                border-color: $black;
                &:hover {
                    color: $white;
                    background: $light-green;
                }
            }
        }
        .send-reply-btn {
            .btn-secondary {
                &:hover,
                &:focus {
                    color: $white;
                    background-color: $navy-blue;
                    border-color: $navy-blue;
                }
            }
        }
    }
}
</style>
