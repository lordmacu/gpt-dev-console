<template>
    <div class="history">
        <div class="history-head">
            <span>Chat History</span>
        </div>
        <div class="history-container flex-grow-1" v-if="chat != null">

            <HistoryElement :id="`chat-${chatElement.id}`" v-for="(chatElement) in chats" :key="chatElement.id"
                :ref="`chat-${chatElement.id}`" @click.native="loadChat(chatElement)" :chat="chatElement"
                :is-selected="chatElement.id == chat.id">
            </HistoryElement>


        </div>
        <button type="button" class="btn btn-primary w-100" v-b-modal.modal-1>+ New Chat</button>
        <b-modal ref="newChatModal" id="modal-1" :title="'What kind of question are you asking?'" hide-footer>

            <b-button-group>
                <b-button @click="createChat('php')" variant="outline-primary">PHP</b-button>
                <b-button @click="createChat('javascript')" variant="outline-primary">Javascript</b-button>
                <b-button @click="createChat('vue')" variant="outline-primary">Vue</b-button>
                <b-button @click="createChat('sql')" variant="outline-primary">Sql</b-button>
                <b-button @click="createChat('other')" variant="outline-primary">Other</b-button>
            </b-button-group>
        </b-modal>
    </div>
</template>

<script>
import HistoryElement from './HistoryElement.vue'
import Chat from '@/models/Chat';

export default {
    name: 'HistoryContainer',
    components: {
        HistoryElement
    },

    data() {
        return {
            chatType: '',
            chats: [],
            chat: new Chat(),
        };
    }, methods: {
        loadCurrentChat(chat) {
            this.chat = chat;
        },
        async createChat(chatType) {
            this.chatType = chatType.toLowerCase();
            this.chat = await Chat.create("New Chat :" + this.chatType, this.chatType);
            await this.loadChats();
            this.$emit('new-chat', this.chat);

            this.$refs.newChatModal.hide();
            setTimeout(() => {
                document.getElementById('chatInput').focus();
            }, 200);


        },
        async loadChats() {
            this.chats = await Chat.loadAllChatsWithMessages();
        },
        loadChat(chat) {
            this.chat = chat;
            this.$router.push({ name: 'Chat', params: { uuid: chat.uuid } })
        }
    },
    mounted() {

        this.loadChats();
    }
};
</script>

<style lang="scss" scoped>
.history {
    padding-top: 20px;
    text-align: start;

}

.history-container {
    padding-left: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 300px);
    text-align: start;
    margin-bottom: 50px;
    padding-right: 20px;
    padding-top: 10px;


}



.messages-container::-webkit-scrollbar {
    display: none;
}

.history-head {
    margin-bottom: 30px;

    span {
        color: #585c5e;
    }
}
</style>