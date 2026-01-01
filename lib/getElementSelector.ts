import { BasicAcceptedElems, CheerioAPI} from "cheerio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getElementSelector = ($: CheerioAPI, el: BasicAcceptedElems<any>) => {
    const element = $(el);
  
    const tag = el.tagName;
  
    const id = element.attr("id");
    if (id) return `${tag}#${id}`;
  
    const className = element.attr("class");
    if (className) {
      const classes = className.split(/\s+/).join(".");
      return `${tag}.${classes}`;
    }
  
    const parent = element.parent();
    if (parent.length) {
      const index = parent.children(tag).index(el) + 1;
      return `${parent[0].tagName} > ${tag}:nth-of-type(${index})`;
    }
  
    return tag;
  }

  export default getElementSelector;