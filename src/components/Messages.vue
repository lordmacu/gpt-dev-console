<template>
    <div class="messages-container flex-grow-1" ref="messagesContainer" id="chat-box">
        <ChatMessage v-for="(message, index) in messages"  :ref="'message_'+message.id" :key="index" :message="message"></ChatMessage>
    </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue'

export default {
    name: 'MessagesContainer',
    components: {
        ChatMessage,
    },
    props: {
        messages: {
            type: Array,
            required: true,
        },
    },
    updated() {
        this.scrollToBottom();
    },
    data() {
        return {
        };
    },
    methods: {
        updateMessage(message) {
             const messageComponent = this.$refs['message_'+message.id][0];
              if(messageComponent){
                messageComponent.updateMessage(message);
                this.scrollToBottom();
             }
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }
};
</script>

<style lang="scss">
.messages-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 300px);
    text-align: start;
    padding-right: 60px;
    padding-left: 60px;
    padding-top: 50px;

}

.messages-container::-webkit-scrollbar {
    display: none;
}
</style>