if (!process.env.WORDPRESS_SITE_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_SITE_URL.
  `)
}
const API_URL = `${process.env.WORDPRESS_SITE_URL}/index.php/wp-json/`;
/** @type {import('next').NextConfig} */
const webpack = require("webpack");
module.exports = {
  images: {
    domains: [
      API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'global.ariseplay.com',
        port: '',
        pathname: '/amg/www.thisdaylive.com/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  staticPageGenerationTimeout: 1800, //  30 `minutes
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
      new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }));
  return config;
  },
  publicRuntimeConfig: {
    WORDPRESS_SITE_URL: process.env.WORDPRESS_SITE_URL,
    WORDPRESS_ADMIN_NAME: process.env.WORDPRESS_ADMIN_NAME,
    WORDPRESS_ADMIN_APP_PASSWORD: process.env.WORDPRESS_ADMIN_APP_PASSWORD,
    COOKIEYES_APIKEY: process.env.COOKIEYES_APIKEY,
    SITE_URL: process.env.SITE_URL,
    GTAG: process.env.GTAG,

  },
  experimental: {
    amp: {
      skipValidation: true
    }
  }
}
