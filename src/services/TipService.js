
import db from '@/db';

const TipService = {
  async addTip(keywords, content) {
    const tipId = await db.tips.add({
      keywords: keywords.join(','),
      content
    });
    
    return tipId;
  },

  async getTipsByKeyword(keyword) {
    const keywordLower = keyword.toLowerCase();
    return await db.tips.filter(tip => 
      tip.keywords.toLowerCase().split(',').map(k => k.trim()).includes(keywordLower)
    ).toArray();
  },

  async getAllTips() {
    return await db.tips.toArray();
  },

};

export default TipService;
