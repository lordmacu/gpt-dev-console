<template>
    <router-link :to="link" class="nav-link">
        <div class="container-menu-item">
            <vue-fontawesome :icon="icon" size="1.5" :color="color"></vue-fontawesome>
            <span class="menu-item-text"> {{ text }}
            </span>

        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ChatInput',
    props: {
        icon: { type: String, default: 'send' },
        color: { type: String, default: 'lightgray' },
        text: { type: String, default: 'send' },
        link: { type: String, default: '/' }
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
.container-menu-item {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    text-align: start;
    margin-bottom: 20px;

    span {
        margin-left: 25px;
    }

    &:hover {
        background-image: linear-gradient(to right, #2e3445, #323337);
    }
}

.menu-item-text {
    color: white;
}
</style>
