const fs = require("fs");
module.exports = {
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
    const posts = fs.readdirSync("./posts");

    posts.forEach(filename => {
      const slug = filename.replace(".json", "");
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
