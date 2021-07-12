const Button = (svg: string) => {
  return `<button className="theme-toggle" type="button" aria-label="Toggle theme">
            ${svg}
        </button>`
}

export default Button
