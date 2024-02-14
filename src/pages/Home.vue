<template>
    <b-row class="flex-grow-1">
        <b-col cols="9" class="chat-content d-flex flex-column">
            <Chat ref="chat" v-if="chat" :chat="chat" @message-added="handleMessageAdded" />

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
import OpenAI from 'openai';

import Message from '@/models/Message';

export default {
    name: 'HomeComponent',
    components: {
        History,
        Chat,
    },
    data() {
        return {
            chat: {
                messages: [],
            },
            chatId: null,
            openai: null,
            forceUpdateKey: 0,

        }

    },
    watch: {
        '$route.params.uuid'(newUuid) {
            if (newUuid) {
                this.getByUUID(newUuid);
            } else {
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

        const apiKey = process.env.VUE_APP_API_KEY_OPENAI;
        this.openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });
    },
    methods: {
        forceUpdate() {
            this.forceUpdateKey++;
        },
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
            this.writeMessageAi(message.text);

            this.$refs.history.loadChats();
        },
        extractAndRemoveTitle(text) {
            // Define a regular expression to search for a line starting with "title:" followed by any characters
            const titleRegex = /^title:\s*(.*)$/im;

            // Search for the title in the text
            const titleMatch = text.match(titleRegex);

            // Extract the title if one was found
            let title = titleMatch ? titleMatch[1] : null;

            // Remove the title line from the text
            let textWithoutTitle = title ? text.replace(titleRegex, '') : text;

            // Remove empty lines at the start of the modified text
            textWithoutTitle = textWithoutTitle.replace(/^\s*\n/gm, '');

            return { title, textWithoutTitle };
        },
        async writeMessageAi(text) {
            const message = await Message.add(this.chat.id, "", 'chat');
            this.chat.messages.push(message);

            const stream = await this.openai.beta.chat.completions.stream({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Este es un asistente de programación. Por favor, genera código basado en las solicitudes. al principio de la conversacion escribe: title:titulo donde titulo es un titulo corto que puedas ponerle a mi pregunta y que el titulo no tenga mas de 50 letras y despues agrega un enter' },
                    { role: 'user', content: text },
                ],
                stream: true,
            });

            stream.on('content', async (delta, snapshot) => {

                console.log(snapshot);
                var extractAndRemoveTitle = await this.extractAndRemoveTitle(snapshot);

                const messages = await Message.edit(message.id, extractAndRemoveTitle.textWithoutTitle);
                await ChatModel.edit(this.chat.id, extractAndRemoveTitle.title);
                this.chat.title = extractAndRemoveTitle.title;

                this.$refs.chat.setMessage(messages);

            });
            stream.on('end', async (snapshot) => {
                console.log(snapshot);
                this.$nextTick(() => {
                    setTimeout(() => {
                        var elemento = document.getElementById("chat-box");
                        elemento.scrollTop = elemento.scrollHeight;
                    }, 100);
                });
            });

        },

        getIndexByID(message) {
            const index = this.chat.messages.findIndex(m => m.id === message.id);
            if (index !== -1) {
                return index;
            }

        }
    }

};


</script>
  
<style></style>
  
   