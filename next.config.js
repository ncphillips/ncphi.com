const fs = require('fs');
module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.NCPHI_COM_GH_ID,
    GITHUB_CLIENT_SECRET: process.env.NCPHI_COM_GH_SECRET,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const pathMap = {
      '/': { page: '/' },
    };

    /**
     * Generate Path Maps for all posts
     */
    const posts = fs.readdirSync('./src/content/blog');

    posts.forEach((filename) => {
      const slug = filename.replace('.md', '');
      pathMap[`/blog/${slug}`] = {
        page: '/blog/[slug]',
        query: {
          slug,
        },
      };
    });

    return pathMap;
  },
};
