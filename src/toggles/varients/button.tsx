export const ButtonReact = (name: string) => {
  return `<${name} duration={750} />`
}

export const ButtonHTML = (svg: string) => {
  return `<button class="theme-toggle" type="button" aria-label="Toggle theme">
            ${svg}
        </button>`
}
