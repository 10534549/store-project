<template>
    <div class="deleteModal">
        <span>
            <b-modal :id="mymodal" hide-footer hide-header-border>
                <template v-slot:modal-title> </template>
                <div class="d-block text-center">
                    <h3>Are you sure you want to Delete?</h3>
                </div>
                <div class="text-center">
                    <b-button
                        class="mt-3 mr-2 btn-success"
                        md
                        @click="onOkClick"
                        >OK</b-button
                    >
                    <b-button class="mt-3 btn-danger" md @click="cancel"
                        >CANCEL</b-button
                    >
                </div>
            </b-modal>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        mymodal: {
            type: String,
            default() {
                return ''
            },
        },
    },
    event: 'conformModal',
    methods: {
        onOkClick() {
            this.$emit('conformModal', this.mymodal)
            this.$root.$emit('bv::hide::modal', this.mymodal, '#btnShow')
        },
        cancel() {
            this.$root.$emit('bv::hide::modal', this.mymodal, '#btnShow')
        },
    },
}
</script>
