function importIcons(r: any) {
  return r.keys().map((fileName: string) => {
    const name = fileName.substr(2).replace(/\.svg$/, "")
    return {
      name,
      svg: r(fileName).default,
    }
  })
}

export const icons = importIcons(
  // @ts-ignore
  require.context(`theme-toggles/svgs/`, false, /\.svg$/)
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
  let code = ""
  let { children, ...props } = component.props
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

export function copyIcon(
  icon: any,
  as: "jsx" | "html",
  container: (svg: any) => any
) {
  let jsx = container(serialize(icon.svg))

  if (as === "jsx") return jsx

  return jsx
    .replace("className=", "class=")
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
    .replace("view-box=", "viewBox=")
}
