<template>
    <div>
        <TitleChat :title="chat.title">
            <template v-slot:actions>
                <Star v-b-tooltip.hover title="Save" />
                <Share v-b-tooltip.hover title="Share" />
                <Elipsis v-b-tooltip.hover title="Options" />
            </template>
        </TitleChat>
        <Messages ref="messages" :messages="chat.messages" />
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


import OpenAI from 'openai';

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
            openai: null
        }
    },

    methods: {

        setMessage(message) {
            this.$refs.messages.updateMessage(message);
        },


        async newMessage(textMessage) {

            try {
                const message = await Message.add(this.chat.id, textMessage, 'me');
                this.$emit('message-added', message);
            } catch (error) {
                console.error('error:', error);
            }
        }
    },
    mounted() {
        const apiKey = process.env.VUE_APP_API_KEY_OPENAI;
        this.openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });
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
  
   