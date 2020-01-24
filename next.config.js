const fs = require("fs");
module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  },
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const pathMap = {
      "/": { page: "/" }
    };

    /**
     * Generate Path Maps for all posts
     */
    const posts = fs.readdirSync("./src/content/blog");

    posts.forEach(filename => {
      const slug = filename.replace(".md", "");
      pathMap[`/blog/${slug}`] = {
        page: "/blog/[slug]",
        query: {
          slug
        }
      };
    });

    return pathMap;
  }
};
