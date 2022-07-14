<template>
    <div class="support-section main-content">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div>
                <div class="title text-uppercase">{{ title }}</div>
            </div>
        </div>
        <!-- title section end -->
        <!-- support section start -->
        <div class="support-content p-3 font-12">
            <!-- <b-form
                ref="form"
                name="supportForm"
                @submit.stop.prevent="handleSubmit"
            >
                <div
                    :class="{
                        'form-group--error': $v.supportForm.subject.$error,
                    }"
                >
                    <b-form-group>
                        <div>
                            <label for="subject"
                                >Subject
                                <span class="error-txt">*</span>
                            </label>
                        </div>
                        <b-form-input
                            id="subject"
                            v-model="supportForm.subject"
                            class="form-control"
                        ></b-form-input>
                        <div
                            v-if="
                                $v.supportForm.subject.$touch &&
                                    $v.supportForm.subject.$error
                            "
                            class="error-txt"
                        >
                            Subject is required
                        </div>
                    </b-form-group>
                </div>
                <div
                    :class="{
                        'form-group--error': $v.supportForm.message.$error,
                    }"
                >
                    <b-form-group>
                        <div>
                            <label for="message"
                                >Message
                                <span class="error-txt">*</span>
                            </label>
                        </div>
                        <b-form-textarea
                            id="message"
                            v-model="supportForm.message"
                            placeholder="Enter Message..."
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                        <div
                            v-if="
                                $v.supportForm.message.$touch &&
                                    $v.supportForm.message.$error
                            "
                            class="error-txt"
                        >
                            Message is required
                        </div>
                    </b-form-group>
                </div>
                <div class="create-btn text-right pb-2">
                    <b-button
                        class="btn-sm bg-navy-blue px-4 shadow-none"
                        @click="onCreate(supportForm)"
                    >
                        Create
                    </b-button>
                </div>
            </b-form> -->
            <div
                class="ticket text-right pt-2 pb-2 font-14 open-sans-semi-bold"
            >
                Total Ticket: ({{ noOfTicket }})
            </div>
            <div v-for="ticket in support" :key="ticket.id" class="mb-2">
                <b-list-group>
                    <b-list-group-item>
                        <!-- <div class="d-flex justify-content-between">
                            <div class="open-sans-bold text-capitalize">
                                {{ store.subject }}
                            </div>
                            <div>{{ store.message }}</div>
                            <div>{{ store.date }}</div>
                            <div class="status open-sans-bold">
                                <nuxt-link
                                    :to="{
                                        path: '/support/' + store.key,
                                    }"
                                >
                                    {{ store.status }}
                                </nuxt-link>
                            </div>
                            <div class="pl-2">
                                <b-badge class="bg-gold">{{
                                    store.statusNo
                                }}</b-badge>
                            </div>
                        </div> -->
                        <b-row align-v="center">
                            <b-col md="3">
                                <div class="open-sans-bold text-capitalize">
                                    <span class="open-sans-semi-bold"
                                        >Ticket :</span
                                    >
                                    {{ ticket.id }}
                                </div>
                            </b-col>
                            <!-- <b-col md="4">
                                <div>{{ ticket.message }}</div>
                            </b-col> -->
                            <b-col md="3">
                                <div>
                                    {{
                                        ticket.created_at
                                            | moment('Do MMMM , YYYY ')
                                    }}
                                </div>
                            </b-col>
                            <b-col md="1">
                                <div class="status open-sans-bold">
                                    <nuxt-link
                                        :to="{
                                            path: '/support/' + ticket.id,
                                        }"
                                    >
                                        <span>{{
                                            ticket.status | freshDeskStatus
                                        }}</span>
                                    </nuxt-link>
                                </div>
                            </b-col>
                            <!-- <b-col md="1">
                                <div>
                                    <b-badge class="bg-gold">{{
                                        ticket.statusNo
                                    }}</b-badge>
                                </div>
                            </b-col> -->
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div
                v-if="noTicketsFound"
                class="text-center py-3 font-16 font-weight-bold"
            >
                No Tickets Found
            </div>
        </div>
        <!-- support section end -->
    </div>
</template>
<script>
import _ from 'lodash'
import service from '@/service/apiService'
import global from '@/service/global.js'

export default {
    middleware: 'authenticationGuard',

    data() {
        return {
            title: 'support',
            noOfTicket: 0,
            noTicketsFound: false,
            support: [],
            emailForTicket: '',
        }
    },
    mounted() {
        this.emailForTicket = global.getUserDetail().email
        this.viewAllTickets()
    },
    methods: {
        viewAllTickets() {
            const emailObj = {}
            emailObj.email = this.emailForTicket
            service.allTicketinSupport(emailObj, (result) => {
                if (!_.isEmpty(result)) {
                    this.support = result
                    this.noOfTicket = result.length
                } else {
                    this.noTicketsFound = true
                    this.noOfTicket = 0
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.support-section {
    .support-content {
        .form-group {
            label {
                font-family: $open-sans-bold;
                font-size: $font-14;
            }
            ::placeholder {
                font-size: $font-12;
            }
        }
        .create-btn {
            .btn-secondary {
                &:hover,
                &:focus {
                    background: $navy-blue;
                }
            }
        }
        .status {
            a {
                color: $black;
                text-decoration: none;
                background-color: transparent;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
