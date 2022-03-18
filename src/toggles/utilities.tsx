import prettier from "prettier/standalone";
import parser from "prettier/parser-typescript";
import { highlight, languages } from "prismjs";
import { DivHTML } from "./varients/div";
import { CheckboxHTML } from "./varients/checkbox";
import {
  ButtonHTML,
  ButtonReact,
  ButtonReactReversed,
} from "./varients/button";

interface Toggle {
  svg: string;
  name: string;
}

function importToggles(r: any): Toggle[] {
  return r.keys().map((fileName: string) => {
    const name = fileName.substr(2).replace(/\.svg$/, "");
    return {
      name,
      svg: r(fileName).default,
    };
  });
}

export const toggles = importToggles(
  // @ts-ignore
  require.context(`theme-toggles/assets/svgs/`, false, /\.svg$/)
);

function highlightCode(code: string, language: "jsx" | "html") {
  return highlight(code, languages[language], language);
}

function formatHTMl(
  code: string,
  wrapper: (svg: string) => string,
  reversed: boolean = false,
  highlight = true
) {
  let formatted = prettier
    .format(wrapper(code), {
      semi: false,
      parser: "typescript",
      plugins: [parser],
    })
    .replace(";", "")
    .replace(/[\r\n]+$/, "");

  if (reversed)
    formatted = formatted.replace(
      /(.)(?<=class=".+?")/,
      ' theme-toggle--reversed"'
    );

  if (highlight)
    return {
      highlighted: highlightCode(formatted, "html"),
      plain: formatted,
    };

  return formatted;
}

function formatReact(
  name: string,
  reversed: boolean = false,
  highlight = true
) {
  const wrapper = reversed ? ButtonReactReversed : ButtonReact;

  const formatted = prettier
    .format(wrapper(name), {
      semi: false,
      parser: "typescript",
      plugins: [parser],
    })
    .replace(";", "")
    .replace(/[\r\n]+$/, "");

  if (highlight)
    return {
      highlighted: highlightCode(formatted, "jsx"),
      plain: formatted,
    };
  return formatted;
}

function stringifyAttrs(attrs: any, filter = () => true) {
  const str = Object.keys(attrs)
    .filter(filter)
    .map((attr) =>
      /^[0-9.]+$/.test(attrs[attr])
        ? `${attr}={${attrs[attr]}}`
        : `${attr}="${attrs[attr]}"`
    )
    .join(" ");
  if (str) return ` ${str}`;
  return str;
}

function castArray(value: any) {
  return Array.isArray(value) ? value : [value];
}

function serialize(component: any) {
  if (!component.type) return "";
  let code = "";
  const { children = null, ...props } = component.props;
  if (typeof component.type === "string") {
    if (children) {
      code += `<${component.type}${stringifyAttrs(props)}>${castArray(children)
        .map(serialize)
        .join("")}</${component.type}>`;
    } else {
      code += `<${component.type}${stringifyAttrs(props)} />`;
    }
  } else {
    code += castArray(children).map(serialize).join("");
  }
  return code;
}

export function generatePreview(toggle: Toggle) {
  return serialize(toggle.svg)
    .replace(/className=/g, "class=")
    .replace(/=\{([^}]+)\}/g, '="$1"')
    .replace(
      /(\s)([a-z]+)="/gi,
      (_: any, ws: any, attr: string) =>
        `${
          ws +
          attr.replace(
            /([a-z])([A-Z])/g,
            (_: any, p1: any, p2: string) => `${p1}-${p2.toLowerCase()}`
          )
        }="`
    )
    .replace(/width="1em"/, "")
    .replace(/height="1em"/, "")
    .replace(/view-box=/g, "viewBox=")
    .replace(/path-length=/g, "pathLength=");
}

export interface CodeType {
  plain: string;
  highlighted: string;
}

export interface ToggleCodeType {
  name: string;
  code: CodeType;
  reversed: CodeType;
  type: "jsx" | "html";
}

export interface CodeCollectionType {
  display: string;
  variants: ToggleCodeType[];
}

export function generateCode(
  toggle: Toggle,
  framework: "html" | "react"
): CodeCollectionType {
  const jsxBasic = serialize(toggle.svg);
  const htmlBasic = jsxBasic
    .replace(/className=/g, "class=")
    .replace(/=\{([^}]+)\}/g, '="$1"')
    .replace(
      /(\s)([a-z]+)="/gi,
      (_: any, ws: any, attr: string) =>
        `${
          ws +
          attr.replace(
            /([a-z])([A-Z])/g,
            (_: any, p1: any, p2: string) => `${p1}-${p2.toLowerCase()}`
          )
        }="`
    )
    .replace(/view-box=/g, "viewBox=")
    .replace(/path-length=/g, "pathLength=");

  if (framework === "react")
    return {
      display: generatePreview(toggle),
      variants: [
        {
          name: "button",
          type: "jsx",
          code: formatReact(toggle.name) as CodeType,
          reversed: formatReact(toggle.name, true) as CodeType,
        },
      ],
    };

  return {
    display: generatePreview(toggle),
    variants: [
      {
        name: "button",
        type: "html",
        code: formatHTMl(htmlBasic, ButtonHTML) as CodeType,
        reversed: formatHTMl(htmlBasic, ButtonHTML, true) as CodeType,
      },
      {
        name: "div",
        type: "html",
        code: formatHTMl(htmlBasic, DivHTML) as CodeType,
        reversed: formatHTMl(htmlBasic, DivHTML, true) as CodeType,
      },
      {
        name: "checkbox",
        type: "html",
        code: formatHTMl(htmlBasic, CheckboxHTML) as CodeType,
        reversed: formatHTMl(htmlBasic, CheckboxHTML, true) as CodeType,
      },
    ],
  };
}
