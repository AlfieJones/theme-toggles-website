export const ButtonJSX = (svg: string) => {
  return `<button className="theme-toggle" type="button" aria-label="Toggle theme">
            ${svg}
        </button>`
}

export const ButtonHTML = (svg: string) => {
  return `<button class="theme-toggle" type="button" aria-label="Toggle theme">
            ${svg}
        </button>`
}
