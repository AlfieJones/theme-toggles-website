export const DivJSX = (svg: string) => {
  return `
  <div className="theme-toggle">
    <span className="sr-only">Toggle theme</span>
    ${svg}
  </div>`
}

export const DivHTML = (svg: string) => {
  return `
  <div class="theme-toggle">
    <span class="sr-only">Toggle theme</span>
    ${svg}
  </div>`
}
