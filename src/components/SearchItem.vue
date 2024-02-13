<template>
    <div class="search-item">
        <div  >
            <h4>{{ chat.title }}</h4>
            <p v-if="chat.messages.length > 0"> {{ chat.messages[chat.messages.length-1].text }} </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchItem',
    props: {
        chat: Object
    },
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.search-item {
    background-color: #141718;
    border-radius: 20px;
    padding: 30px;
    position: relative;
    margin-bottom: 40px;
    cursor: pointer;
    &:hover{
        background-color: #14171896;
    }
}
</style>
