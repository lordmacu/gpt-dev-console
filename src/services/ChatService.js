
import db from '@/db';

const ChatService = {
  async createChat(title, type, date = new Date()) {
    const uuid = this.generateUUID();
    const keywords = [];
    const chatId = await db.chats.add({ uuid, title, type, keywords, date });
    
    return {uuid, chatId};
  },

  async searchChatsAndMessagesByText(searchText) {
    const chatsMatchingTitle = await db.chats.where('title').equalsIgnoreCase(searchText).toArray();

    const messagesMatchingText = await db.messages.filter(message => 
        message.text.toLowerCase().includes(searchText.toLowerCase())
    ).toArray();

    const chatIdsFromMessages = [...new Set(messagesMatchingText.map(message => message.chatId))];

    const chatsFromMessages = await db.chats.where('id').anyOf(chatIdsFromMessages).toArray();

    const combinedChats = [...chatsMatchingTitle, ...chatsFromMessages].reduce((acc, chat) => {
        if (!acc.find(c => c.id === chat.id)) {
            acc.push(chat);
        }
        return acc;
    }, []);

    const chatsWithMatchingMessages = await Promise.all(combinedChats.map(async (chat) => {
        const messages = await db.messages.where({ chatId: chat.id }).filter(message => 
            message.text.toLowerCase().includes(searchText.toLowerCase())
        ).toArray();

        return { ...chat, messages };
    }));

    return chatsWithMatchingMessages;
},

  

  async getAllChats() {
    return await db.chats.orderBy('date').reverse().toArray();
  },

  async getLastChat() {
    const lastChat = await db.chats.orderBy('date').reverse().first();
    return lastChat;
},

  async searchChatByTitle(title) {
    return await db.chats.where('title').equalsIgnoreCase(title).toArray();
  },

  

  async getChatByUUID(uuid) {
    return await db.chats.where('uuid').equals(uuid).first();
  },

  generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  },

  async deleteChatsWithoutMessagesExceptUUID(keepUUID) {
    const allChats = await this.getAllChats();
    const chatsToDelete = [];

    for (const chat of allChats) {
        if (chat.uuid === keepUUID) continue;

        const messages = await db.messages.where({ chatId: chat.id }).toArray();
        if (messages.length === 0) {
             chatsToDelete.push(chat.id);
        }
    }

     await db.transaction('rw', db.chats, async () => {
        await Promise.all(chatsToDelete.map(chatId => db.chats.delete(chatId)));
    });

 }


};

export default ChatService;
