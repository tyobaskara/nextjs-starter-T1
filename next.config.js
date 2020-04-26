const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const cssConfig = { cssModules: false };
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
// const path = require('path');

const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    // config.resolve.alias["~"] = path.join(__dirname);

    return config;
  }
}

const plugins = [
  [withCSS, cssConfig],
  [withSass, cssConfig]
]

module.exports = withPlugins(plugins, nextConfig);
