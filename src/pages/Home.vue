<template>
    <b-row class="flex-grow-1">
        <b-col cols="9" class="chat-content d-flex flex-column">
            <Chat v-if="chat" :chat="chat" @message-added="handleMessageAdded" />
        </b-col>
        <b-col cols="3" class="chat-history">
            <History @new-chat="newChat" ref="history" />
        </b-col>

    </b-row>
</template>
  
<script>
import History from '../components/History.vue'
import Chat from '../components/ChatComponent.vue'

import ChatModel from '@/models/Chat';

export default {
    name: 'HomeComponent',
    components: {
        History,
        Chat,
    },
    data() {
        return {
            chat: null,
            chatId: null
        }

    },
    watch: {
        '$route.params.uuid'(newUuid) {
            if(newUuid){
                this.getByUUID(newUuid);
            }else{
                this.loadLastChat();

            }

        }
    },
    mounted() {
        this.chatId = this.$route.params.uuid;
        if (this.chatId) {
            this.getByUUID(this.chatId);
        } else {
            this.loadLastChat();
        }
    },
    methods: {
        loadCurrentChat(chat) {
            this.$refs.history.loadCurrentChat(chat);
        },
        newChat(chat) {

            this.chat = chat;
            this.loadCurrentChat(this.chat);

        },
        async loadLastChat() {
            this.chat = await ChatModel.loadLastChat();
            this.loadCurrentChat(this.chat);

        },
        async getByUUID(uuid) {
            this.chat = await ChatModel.getByUUID(uuid);
            this.loadCurrentChat(this.chat);

            this.$nextTick(() => {
                setTimeout(() => {
                    const chatElementId = `chat-${this.chat.id}`;
                    const chatElement = document.getElementById(chatElementId);
                    if (chatElement) {
                        chatElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 100);
            });

        },
        handleMessageAdded(message) {
            this.chat.messages.push(message);
            this.$refs.history.loadChats();
        }
    }

};


</script>
  
<style></style>
  
   