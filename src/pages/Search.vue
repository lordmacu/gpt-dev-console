<template>
    <b-row>
        <b-col cols="12" class="search d-flex flex-column">
            <InputSearch @search-chat="onSearchChat" />
        </b-col>
        <b-col class="search-component">
            <b-row>
                <b-col cols="3" v-for="(chat, index) in chats" :key="index">
                    <SearchItem :chat="chat" @click.native="goToChat(chat)" />
                </b-col>
            </b-row>
        </b-col>

    </b-row>
</template>
  
<script>
import SearchItem from '../components/SearchItem.vue'
import InputSearch from '../components/InputSearch.vue'
import Chat from '@/models/Chat';


export default {
    name: 'SearchComponent',
    components: {
        SearchItem,
        InputSearch

    },
    data() {
        return {
            chats: [],
        };
    },
    methods: {
        async onSearchChat(textSearch) {
            if (textSearch.length > 2) {
                this.chats = await Chat.searchChatsAndMessagesByText(textSearch);
            }
            if (textSearch.length == 0) {
                this.chats = await Chat.loadChatsWithMessages();
            }
        },
        async loadChats() {
            this.chats = await Chat.loadChatsWithMessages();
        },
        goToChat(chat) {
            this.$router.push({ name: 'Chat', params: { uuid: chat.uuid } })
        }
    },
    mounted() {
        this.loadChats();
    },

};


</script>
  
<style>
.search {
    padding: 40px;
}

.search-component {
    padding-top: 10px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px
}
</style>
  
   