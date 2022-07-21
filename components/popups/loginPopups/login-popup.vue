<template>
    <div class="login-signup">
        <v-dialog
            rounded
            content-class="rounded"
            v-model="dialog"
            max-width="480px"
        >
            <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn pill color="#f17504" v-bind="attrs" v-on="on">
                    Login
                </v-btn> -->
                <v-row class="d-flex">
                    <v-col cols="12" sm="6" md="2"
                        ><v-text-field
                            label="Enter Location"
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field
                            label="What are you looking for?"
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="1">
                        <v-btn color="orange" dark>
                            <v-icon dark>mdi-magnify</v-icon>
                        </v-btn></v-col
                    >
                    <v-col cols="12" sm="6" md="3">
                        <v-btn rounded large elevation="0">
                            BUSINESS REGISTRATION</v-btn
                        >
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-btn rounded large elevation="0">
                            SIGN UP|LOGIN</v-btn
                        >
                    </v-col>
                </v-row>
            </template>

            <v-card rounded class="rounded">
                <v-toolbar flat>
                    <v-tabs
                        rounded
                        class="rounded-xl"
                        v-model="tabs"
                        fixed-tabs
                    >
                        <v-tabs-slider color="orange"></v-tabs-slider>
                        <v-tab href="#mobile-tabs-4-1" class="black--text">
                            <div class="title2">LOGIN</div>
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="tabs">
                    <v-tab-item
                        v-for="i in 1"
                        :key="i"
                        :value="'mobile-tabs-4-' + i"
                    >
                        <v-card flat v-if="i == 1">
                            <login @closeDialog="closeDialog" />
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
                <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeDialog()">
                        Close
                    </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import login from '@/components/popups/loginPopups/login.vue'
export default {
    components: {
        login,
    },
    props: ['dialog'],
    data() {
        return {
            // dialog: false,
            tabs: null,
        }
    },
    watch: {
        dialog(val) {
            if (!val) {
                this.closeDialog()
            }
        },
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog', false)
        },
    },
}
</script>

<style scoped>
.title2 {
    font-size: 1.25rem !important;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: 0.0125em !important;
    font-family: 'Roboto', sans-serif !important;
}
</style>
