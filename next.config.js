const { createLoader } = require("simple-functional-loader")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
})

const withPlugins = require("next-compose-plugins")

const withMDX = require("@next/mdx")({
  options: {
    providerImportSource: "@mdx-js/react",
  },
})

module.exports = withPlugins([withBundleAnalyzer, withMDX], {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    loader: "custom",
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (code) {
          return code.replace(/"(.*?)(?<!\\)"/gs, (_, svg) =>
          svg
              .replace(/(aria-hidden=\\"[^]+?\\")/, "")
              .replace(/(?<=xmlns=\\"[^]+?\\")/, 'aria-hidden="true"')
              .replace(/>(\s|\\n)+</g, "><")
              .replace(/\\n$/, "")
              .replace(/\\"/g, '"')
              .replace(
                /(\s)([a-z-]+)="([^"]+)"/gi,
                (_, prefix, attr, value) => {
                  const jsxValue = /^[0-9.]+$/.test(value)
                    ? `{${value}}`
                    : `"${value}"`
                  return `${prefix}${attr.replace(
                    /-([a-z])/gi,
                    (_, letter) => `${letter.toUpperCase()}`
                  )}=${jsxValue}`
                }
              )
          )
        }),
        "raw-loader",
      ],
    })

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    })

    return config
  },
})
