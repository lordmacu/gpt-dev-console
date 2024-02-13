<template>
    <div class="title">
        <h2>{{ title }}</h2>
        <div class="actions">
          
            <slot name="actions"></slot>

        </div>
    </div>
</template>

<script>


export default {
    name: 'TitleChat',
    components: {
   
    },
    props: {
        title: String
    }
};
</script>

<style lang="scss" scoped>
.title {
    text-align: start;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 30px;
    padding-bottom: 10px;
    border-bottom: 3px solid #313435;

    display: flex;
    justify-content: space-between;


    h2 {
        padding-right: 30px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        display: flex;
        align-items: flex-start;

        svg {
            width: 35px;
            height: 35px;
            fill: white;
            margin-left: 8px;
            margin-right: 8px;
            padding: 5px;

            cursor: pointer;

            &:hover {
                background-color: #ffffff3b;
                border-radius: 100%;
            }
        }
    }
}
</style>