
import Dexie from 'dexie';

const db = new Dexie('chat');
db.version(2).stores({
  chats: '++id, uuid, title, type, keywords, date',
  messages: '++id, chatId, text, date',
  tips: '++id, keywords, contenido'
});

export default db;