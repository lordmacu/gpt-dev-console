
import db from '@/db';

const MessageService = {
  async addMessage(chatId, text, sender, date = new Date()) {

    console.log(chatId, text, date = new Date(), sender)
    const messageId = await db.messages.add({
      chatId,
      text,
      date,
      sender
    });
    
    return messageId;
  },

  async getMessagesByChatId(chatId) {
    return await db.messages.where({ chatId }).sortBy('date');
  },
  async getMessageById(messageId) {
    return await db.messages.get(messageId);
  },

  async searchMessagesInChat(chatId, searchText) {
    return await db.messages
      .where('chatId')
      .equals(chatId)
      .filter(message => message.text.toLowerCase().includes(searchText.toLowerCase()))
      .toArray();
  },

  async editMessage(messageId, newText) {
    return await db.messages.update(messageId, { text: newText });
  }

};

export default MessageService;
