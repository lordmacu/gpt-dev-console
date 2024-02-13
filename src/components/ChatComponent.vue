<template>
    <div>
        <TitleChat :title="chat.title">
            <template v-slot:actions>
                <Star v-b-tooltip.hover title="Save" />
                <Share v-b-tooltip.hover title="Share" />
                <Elipsis v-b-tooltip.hover title="Options" />
            </template>
        </TitleChat>
        <Messages :messages="chat.messages" />
        <ChatInput @new-message="newMessage"></ChatInput>
    </div>
</template>
  
<script>
import ChatInput from '../components/ChatInput.vue'
import Messages from '../components/Messages.vue'
import TitleChat from '../components/TitleChat.vue'

import Share from '../components/icons/Share.vue'
import Elipsis from '../components/icons/Elipsis.vue'
import Star from '../components/icons/Star.vue'

import Message from '@/models/Message';

export default {
    name: 'ChatComponent',
    props: {
        chat: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            chatObject: '',
            messages: [],
        }
    },

    methods: {

        async newMessage(textMessage) {

            try {
                const message= await Message.add(this.chat.id, textMessage);
                this.$emit('message-added', message);
            } catch (error) {
                console.error('error:', error);
            }
        }
    },
    mounted() {
        this.chatObject = this.chat;
    },
    components: {
        ChatInput,
        Messages,
        TitleChat,
        Share,
        Elipsis,
        Star
    },

};


</script>
  
<style></style>
  
   