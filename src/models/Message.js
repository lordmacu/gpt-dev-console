
import MessageService from '@/services/MessageService';

class Message {
  constructor(id, chatId, text, date = new Date()) {
    this.id = id;
    this.chatId = chatId;
    this.text = text;
    this.date = date;
  }

  static async add(chatId, text) {
    const messageId = await MessageService.addMessage(chatId, text);
    return new Message(messageId, chatId, text, new Date());
  }

  static async getByChatId(chatId) {
    const messagesData = await MessageService.getMessagesByChatId(chatId);
    return messagesData.map(messageData => new Message(messageData.id, messageData.chatId, messageData.text, messageData.date));
  }

  static async searchInChat(chatId, searchText) {
    const messagesData = await MessageService.searchMessagesInChat(chatId, searchText);
    return messagesData.map(messageData => new Message(messageData.id, messageData.chatId, messageData.text, messageData.date));
  }
 }

export default Message;
