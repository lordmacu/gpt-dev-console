 import ChatService from '@/services/ChatService';
 import MessageService from '@/services/MessageService';

 class Chat {
     constructor(id, uuid, title, type, messages = [], keywords = []) {
         this.id = id;
         this.uuid = uuid;
         this.title = title;
         this.type = type;
         this.messages = messages;
         this.keywords = keywords;

     }

     static async create(title, type) {
         const chat = await ChatService.createChat(title, type);

         return new Chat(chat.chatId, chat.uuid, title, type, []);
     }

     static async searchByTitle(title) {
         const chatsData = await ChatService.searchChatByTitle(title);
         return chatsData.map(chatData => new Chat(chatData.id, chatData.uuid, chatData.title, chatData.type, chatData.messages, chatData.d));
     }

     static async getByUUID(uuid) {
         const chatData = await ChatService.getChatByUUID(uuid);
         if (chatData) {
             const messages = await MessageService.getMessagesByChatId(chatData.id);
             return new Chat(chatData.id, chatData.uuid, chatData.title, chatData.type, messages, chatData.keywords, chatData.date);
         }
         return null;
     }
     static async loadChatAndMessages(uuid) {
         const chatData = await ChatService.getChatByUUID(uuid);
         if (!chatData) {
             throw new Error('Chat not found');
         }
         const messages = await MessageService.getMessagesByChatId(chatData.id);

         const chat = new Chat(chatData.id, chatData.uuid, chatData.title, chatData.type, messages, chatData.keywords, chatData.date);

         chat.messages = await MessageService.getMessagesByChatId(chat.id);

         return chat;
     }

     /**
      * Deletes all chats that do not match the specified UUID and have no messages.
      * @param {string} keepUUID The UUID of the chat to not delete.
      */
     static async deleteAllChatsExceptUUID(keepUUID) {

         await ChatService.deleteChatsWithoutMessagesExceptUUID(keepUUID);

     }


     static async loadAllChatsWithMessages() {
         const chatsData = await ChatService.getAllChats();
         const chats = await Promise.all(chatsData.map(async (chatData) => {
             const messages = await MessageService.getMessagesByChatId(chatData.id);
             return new Chat(chatData.id, chatData.uuid, chatData.title, chatData.keywords, messages, chatData.date);
         }));
         return chats;
     }

     static async loadChatsWithMessages() {
         const chatsData = await ChatService.getAllChats();
         const chatsWithMessages = await Promise.all(chatsData.map(async (chatData) => {
             const messages = await MessageService.getMessagesByChatId(chatData.id);
             if (messages.length > 0) {
                 return new Chat(chatData.id, chatData.uuid, chatData.title, chatData.type, messages, chatData.keywords);
             }
             return null;
         }));

         const chatsFiltered = chatsWithMessages.filter(chat => chat !== null);
         return chatsFiltered;
     }

     static async searchChatsAndMessagesByText(text) {
         const chatsData = await ChatService.searchChatsAndMessagesByText(text);
         const chatsWithMessages = await Promise.all(chatsData.map(async (chatData) => {
             const messages = await MessageService.getMessagesByChatId(chatData.id);
             if (messages.length > 0) {
                 return new Chat(chatData.id, chatData.uuid, chatData.title, chatData.type, messages, chatData.keywords);
             }
             return null;
         }));

         const chatsFiltered = chatsWithMessages.filter(chat => chat !== null);
         return chatsFiltered;
     }


     static async loadLastChat() {

         const chatData = await ChatService.getLastChat();
         if (!chatData) {
             console.log('No chats found');
             return;
         }
         const messages = await MessageService.getMessagesByChatId(chatData.id);

         return new Chat(chatData.id, chatData.uuid, chatData.title, chatData.keywords, messages, chatData.date);
     }

 }

 export default Chat;