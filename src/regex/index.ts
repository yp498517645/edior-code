type RegexMap = {
  Head: RegExp;
  [key: string]: RegExp;
};

const Head = /^#{1,5}\s/g;
const regex: RegexMap = {
  Head,
};

export default regex;
