## keywords-highlight-html

---

一个提供富文本高亮关键字工具

### <center>Install</center>

`npm i --save-dev keywords-highlight-html`

`yarn add --dev keywords-highlight-html`

### 方法属性配置

| 属性     | 说明               | 类型               | 默认值 |
| -------- | ------------------ | ------------------ | ------ |
| content  | 文本内容           | string             | -      |
| keywords | 维护的关键字信息表 | HighlightKeyWord[] | -      |

### HighlightKeyWord 属性

| 属性        | 说明                     | 类型                      | 默认值 |
| ----------- | ------------------------ | ------------------------- | ------ |
| word        | 要匹配的关键字           | string                    | -      |
| transformer | 对匹配到的关键字如何转换 | (node: string) => string; | -      |

### <center>Usage</center>

---

react

```
const Highlight = () => {
  const [html, setHtml] = useState<string>("");

  const setHighLightStringDom = useCallback(async (html: string) => {
    const highlightDom = await KeywordHighLight(html, [
      {
        word: "JavaScript",
        transformer: (node) => `<span class="high-light">${node}</span>`,
      },
    ]);
    setHtml(highlightDom);
  }, []);

  useEffect(() => {
    const html = data || "";
    setHighLightStringDom(html);
  }, [setHighLightStringDom]);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
```
