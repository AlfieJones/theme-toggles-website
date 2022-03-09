import { ButtonHTML, ButtonReact } from "./varients/button"
import { CheckboxHTML } from "./varients/checkbox"
import prettier from "prettier/standalone"
import parser from "prettier/parser-typescript"
import { DivHTML } from "./varients/div"

function importToggles(r: any) {
  return r.keys().map((fileName: string) => {
    const name = fileName.substr(2).replace(/\.svg$/, "")
    return {
      name,
      svg: r(fileName).default,
    }
  })
}

export const toggles = importToggles(
  // @ts-ignore
  require.context(`theme-toggles/assets/svgs/`, false, /\.svg$/)
)

function stringifyAttrs(attrs: any, filter = (i: any) => true) {
  let str = Object.keys(attrs)
    .filter(filter)
    .map((attr) =>
      /^[0-9.]+$/.test(attrs[attr])
        ? `${attr}={${attrs[attr]}}`
        : `${attr}="${attrs[attr]}"`
    )
    .join(" ")
  if (str) return ` ${str}`
  return str
}

function castArray(value: any) {
  return Array.isArray(value) ? value : [value]
}

function serialize(component: any) {
  if (!component.type) return ""
  let code = ""
  let { children = null, ...props } = component.props
  if (typeof component.type === "string") {
    if (children) {
      code += `<${component.type}${stringifyAttrs(props)}>${castArray(children)
        .map(serialize)
        .join("")}</${component.type}>`
    } else {
      code += `<${component.type}${stringifyAttrs(props)} />`
    }
  } else {
    code += castArray(children).map(serialize).join("")
  }
  return code
}

export interface CodeType {
  name: string
  code: string
}

export interface CodeCollectionType {
  display: string
  variants: CodeType[]
}

export function generateCode(
  toggle: any,
  framework: "html" | "react"
): CodeCollectionType {
  const jsxBasic = serialize(toggle.svg)
  const htmlBasic = jsxBasic
    .replace(/className=/g, "class=")
    .replace(/=\{([^}]+)\}/g, '="$1"')
    .replace(
      /(\s)([a-z]+)="/gi,
      (_: any, ws: any, attr: string) =>
        ws +
        attr.replace(
          /([a-z])([A-Z])/g,
          (_: any, p1: any, p2: string) => `${p1}-${p2.toLowerCase()}`
        ) +
        '="'
    )
    .replace(/view-box=/g, "viewBox=")
    .replace(/path-length=/g, "pathLength=")

  if (framework === "react")
    return {
      display: prettier
        .format(CheckboxHTML(htmlBasic), {
          semi: false,
          parser: "typescript",
          plugins: [parser],
        })
        .replace(";", "")
        .replace(/[\r\n]+$/, ""),
      variants: [
        {
          name: "button",
          code: prettier
            .format(ButtonReact(toggle.name), {
              semi: false,
              parser: "typescript",
              plugins: [parser],
            })
            .replace(";", "")
            .replace(/[\r\n]+$/, ""),
        },
      ],
    }

  return {
    display: prettier
      .format(CheckboxHTML(htmlBasic), {
        semi: false,
        parser: "typescript",
        plugins: [parser],
      })
      .replace(";", "")
      .replace(/[\r\n]+$/, ""),
    variants: [
      {
        name: "button",
        code: prettier
          .format(ButtonHTML(htmlBasic), {
            semi: false,
            parser: "typescript",
            plugins: [parser],
          })
          .replace(";", "")
          .replace(/[\r\n]+$/, ""),
      },
      {
        name: "div",
        code: prettier
          .format(DivHTML(htmlBasic), {
            semi: false,
            parser: "typescript",
            plugins: [parser],
          })
          .replace(";", "")
          .replace(/[\r\n]+$/, ""),
      },
      {
        name: "checkbox",
        code: prettier
          .format(CheckboxHTML(htmlBasic), {
            semi: false,
            parser: "typescript",
            plugins: [parser],
          })
          .replace(";", "")
          .replace(/[\r\n]+$/, ""),
      },
    ],
  }
}
