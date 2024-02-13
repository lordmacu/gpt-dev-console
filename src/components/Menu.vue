<template>
    <div class="container-menu">
        <MenuItem color="#0092ff" text="Chats" link="/" />
        <MenuItem color="#3fdf79" text="Search" link="/search" icon="search" />
        <MenuItem color="#ff580f" text="Learning Centre" link="/settings" icon="book" />
        <MenuItem color="#ffffff" text="Team" link="/settings" icon="users" />

        <MenuItem color="#8a53e4" text="Settings" link="/settings" icon="gear" />
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
    name: 'ChatInput',
    components: {
        MenuItem,
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

.container-menu{
    margin-top: 50px;
}
</style>
