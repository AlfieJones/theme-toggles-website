export const CheckboxJSX = (svg: string) => {
  return `
  <label className="theme-toggle">
    <input type="checkbox" />
    <span className="sr-only">Toggle theme</span>
    ${svg}
  </label>`
}

export const CheckboxHTML = (svg: string) => {
  return `
  <label class="theme-toggle">
    <input type="checkbox" />
    <span class="sr-only">Toggle theme</span>
    ${svg}
  </label>`
}
