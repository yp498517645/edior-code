import { Dispatch, SetStateAction, useEffect, useState } from "react";
import regex from "@/regex";

//基础
interface basicToken {
  tag: "h" | "div";
  content?: string;
}

interface HeadToken extends basicToken {
  level: number;
}

export const initHeadToken = (lineStr: String): HeadToken | basicToken => {
  const str = lineStr.trimEnd();
  let isHeadArr = str.match(regex.Head) ?? [];
  let level = isHeadArr[0] ? isHeadArr[0].length - 1 : 0;
  const content = level !== 0 ? str.substring(level + 1) : str;
  if (!isHeadArr.length) {
    //说明不是标题
    return {
      tag: "div",
      content,
    };
  }
  return {
    tag: "h",
    level,
    content,
  };
};

//AstNode 匹配
export const funcAstNode = (tokens: string): HeadToken | basicToken => {
  const result = Object.assign({}, initHeadToken(tokens));
  return result;
};

//AST to HTML
export const funcAstToHtml = (rawStr: string): Array<string> => {
  const resultHtml: Array<HeadToken | basicToken> = [];
  const rawStrLineArr = rawStr.split("\n");
  rawStrLineArr.forEach((raw) => {
    const node = funcAstNode(raw);
    resultHtml.push(node);
  });
  return resultHtml.map((obj: HeadToken | basicToken) => {
    if ("level" in obj && obj.level !== 0) {
      return `<${obj.tag}${4 - obj.level}>${obj.content}</${obj.tag}${
        obj.level
      }>`;
    }
    return `<${obj.tag}>${obj.content}</${obj.tag}>`;
  });
};

function useMarkDown(
  str: string
): [
  string,
  Dispatch<SetStateAction<string>>,
  string,
  Dispatch<SetStateAction<string>>
] {
  const [raw, setRaw] = useState(str);
  const [renderValue, setRenderValue] = useState<string>("");
  useEffect(() => {
    const str = funcAstToHtml(raw).join("");
    setRenderValue(str);
  }, [raw]);
  return [raw, setRaw, renderValue, setRenderValue];
}

export default useMarkDown;
