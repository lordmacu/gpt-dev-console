
import db from '@/db';

const MessageService = {
  async addMessage(chatId, text, date = new Date()) {
    const messageId = await db.messages.add({
      chatId,
      text,
      date
    });
    
    return messageId;
  },

  async getMessagesByChatId(chatId) {
    return await db.messages.where({ chatId }).sortBy('date');
  },

  async searchMessagesInChat(chatId, searchText) {
    return await db.messages
      .where('chatId')
      .equals(chatId)
      .filter(message => message.text.toLowerCase().includes(searchText.toLowerCase()))
      .toArray();
  },

};

export default MessageService;
