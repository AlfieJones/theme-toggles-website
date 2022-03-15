export const ButtonReact = (name: string) => {
  const reactName =
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  return `import "@theme-toggles/react/dist/css/${reactName}.css"
  import {${reactName}} from "@theme-toggles/react"
  
  <${reactName} duration={750} />`
}

export const ButtonHTML = (svg: string) => {
  return `<button class="theme-toggle" type="button" aria-label="Toggle theme">
            ${svg}
        </button>`
}
