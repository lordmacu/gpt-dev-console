<template>
    <b-row>
        <b-col cols="12" class="saved d-flex flex-column">
            <TitleChat title="Saved chats" />

        </b-col>
        <b-col class="saved-component">
            <b-row>

                <b-col cols="3" v-for="(chat, index) in chats" :key="index">
                <SearchItem />
            </b-col>
            </b-row>
        </b-col>

    </b-row>
</template>
  
<script>
import SearchItem from '../components/SearchItem.vue'
import TitleChat from '../components/TitleChat.vue'


export default {
    name: 'SharedComponent',
    components: {
        SearchItem,
        TitleChat


    },
    data() {
        return {
            chats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 5, 6, 7, 8, 9, 10, 11, 12, 13] // Suponiendo que tienes un array de mensajes para el chat
        };
    }

};


</script>
  
<style>
.saved-component {
    padding: 40px;
}
</style>
  
   