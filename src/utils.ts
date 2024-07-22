import { HighlightKeyWords } from ".";

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const makeKeyword2Reg = (keywords: HighlightKeyWords) => {
  // 给关键字加转译符号 优先匹配长的关键字 
  const regStr = keywords.map(({ word }) => escapeRegExp(word)).sort((a, b) => b.length - a.length).join('|');

  return new RegExp(regStr, 'ig')
}