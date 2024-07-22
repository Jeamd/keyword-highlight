import type { Node } from "posthtml";
import postHtml from 'posthtml';
import { makeKeyword2Reg } from "./utils";

export type HighlightKeyWord = {
  word: string;
  transformer: (node: string) => string;
}

export type HighlightKeyWords = Array<HighlightKeyWord>;

export type KeywordHighLightType = (content: string, keywords: HighlightKeyWords) => Promise<string>

const replacer = (content: string, keywordsReg: RegExp, keywordsMap: Map<string, HighlightKeyWord>) => {

  if (!content || !content.length) return content;

  return content.replace(keywordsReg, (keyword) => {
    const { transformer } = keywordsMap.get(keyword.toLowerCase()) || {}
    if (transformer) return transformer(keyword);

    return keyword;
  })
}


const generatReplacePlugin = (keywords: HighlightKeyWords) => {
  const keywordsReg = makeKeyword2Reg(keywords)
  const keywordsMap = new Map(keywords.map(i => [i.word.toLowerCase(), i]))
  return (tree: Node) => {
    // 遍历节点 实例绑定的方法
    tree.walk((node) => {
      if (typeof node === 'string' && !/^\s*$/.test(node)) {
        // 匹配 文本节点 进行处理
        return replacer(node, keywordsReg, keywordsMap) as unknown as Node;
      }
      return node
    })
  }
}

const KeywordHighLight: KeywordHighLightType = function (content, keywords) {

  return new Promise((reslove, reject) => {
    postHtml()
      .use(generatReplacePlugin(keywords))
      .process(content, {})
      .then(({ html }) => {
        reslove(html);
      }, (err) => {
        reject(err);
      })
  })
}

export default KeywordHighLight;