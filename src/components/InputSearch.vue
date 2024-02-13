<template>
    <div class="container-input">
        <div class="search-input" :class="{ 'focus': isFocused }">


            <input placeholder="Search Chat..." @keyup="searchChat" type="text" v-model="text">

            <button v-if="text.length > 0" @click="clearSearch()" :class="`send-button`">
                <vue-fontawesome icon="close" size="2" color="#605e5e"></vue-fontawesome>
            </button>
            <!--- <button @click="sendChat()" :class="`send-button ${text.length === 0 || isDisabled ? 'button-disabled' : ''}`">
                <vue-fontawesome icon="search" size="2" color="#605e5e"></vue-fontawesome>
            </button>
---->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatInput',
    data() {
        return {

            text: '',
            isDisabled: false,
            isFocused: false

        };
    },
    mounted() {

    },
    methods: {
        clearSearch(){
            this.text = '';
            this.$emit('search-chat', this.text);

        },
        searchChat() {
            this.$emit('search-chat', this.text);
        },
        sendChat() {
            console.log("aquiii");
        },
        handleFocus() {
            this.isFocused = true;
        },
        handleBlur() {
            this.isFocused = false;
        },


    }
};
</script>

<style lang="scss" scoped>
input {
    background-color: #141718;
    border: 0px;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
}


.button-disabled {
    background-color: #ffffff8a;

}



.search-input {
    position: relative;

}

.send-button {
    position: absolute;
    right: 10px;
    border-radius: 10px;
    top: 15px;

    i {
        font-size: 25px !important;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 3px;
        padding-bottom: 3px;
        color: #313435;

    }
}
</style>
