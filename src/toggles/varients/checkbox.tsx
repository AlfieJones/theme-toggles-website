const Checkbox = (svg: string) => {
  return `
  <label className="theme-toggle">
    <input type="checkbox" />
    <span className="sr-only">Toggle theme</span>
    ${svg}
  </label>`
}

export default Checkbox
