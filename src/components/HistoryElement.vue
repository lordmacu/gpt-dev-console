<template>
    <div class="history-element" :class="{ 'selected-element': isSelected }">
        <span>{{ chat.title }}</span>
     </div>
</template>

<script>

export default {
    name: 'HistoryElement',
    props: {
        chat: {
            type: Object,
            required: true
        }, 
        isSelected: {
            type: Boolean,
            required: false
        }
    },
};
</script>

<style lang="scss" scoped>
 
 .history-element{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
        background-color: rgba(255, 255, 255, 0.26);

    }
 }

 .selected-element{
    background-color: rgba(255, 255, 255, 0.26);
 }
</style>