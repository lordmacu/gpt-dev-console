import MessageService from '@/services/MessageService';

class Message {
  constructor(id, chatId, text,sender, date = new Date() ) {
    this.id = id;
    this.chatId = chatId;
    this.text = text;
    this.date = date;
    this.sender = sender;
  }

  static async add(chatId, text, sender) {
     const messageId = await MessageService.addMessage(chatId, text, sender);
    return new Message(messageId, chatId, text, new Date(), sender);
  }

  static async edit(messsageId, text) {
    await MessageService.editMessage(messsageId, text);
    return await this.getMessageById(messsageId);

  }

  static async getByChatId(chatId) {
    const messagesData = await MessageService.getMessagesByChatId(chatId);
    return messagesData.map(messageData => new Message(messageData.id, messageData.chatId, messageData.text, messageData.date));
  }
  static async getMessageById(chatId) {
    const messagesData = await MessageService.getMessageById(chatId);
    return new Message(messagesData.id, messagesData.chatId, messagesData.text, messagesData.date);
  }



  static async searchInChat(chatId, searchText) {
    const messagesData = await MessageService.searchMessagesInChat(chatId, searchText);
    return messagesData.map(messageData => new Message(messageData.id, messageData.chatId, messageData.text, messageData.date));
  }
}

export default Message;