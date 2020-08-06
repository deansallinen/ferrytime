const { Liquid } = require("liquidjs");
const { parseISO, format } = require("date-fns");
const slugify = require("slugify");

const liquidOptions = {
  extname: ".liquid",
  strict_filters: true,
  root: ["_includes"],
};

const liquidEngine = new Liquid(liquidOptions);

const ErrorOverlay = require("eleventy-plugin-error-overlay");
const fs = require("fs");

module.exports = function (config) {
  config.setLibrary("liquid", liquidEngine);

  config.addFilter("departureTerminal", (routeName) => {
    const [departureTerminal, arrivalTerminal] = routeName.split(" to ");
    return departureTerminal;
  });

  config.addFilter("arrivalTerminal", (routeName) => {
    const [departureTerminal, arrivalTerminal] = routeName.split(" to ");
    return arrivalTerminal;
  });

  config.addFilter("jsonify", (input) => JSON.stringify(input, null, 2));

  config.addFilter("latestStatus", (sailings) => {
    const { sailing_status } = Object.values(sailings).reduce((acc, cur) =>
      cur.actual_departure ? cur : acc
    );
    if (
      !["On Time", "Cancelled", "", null, undefined].includes(sailing_status)
    ) {
      return "Delayed";
    } else {
      return sailing_status;
    }
  });

  config.addFilter("formatTime", (time) => {
    return time ? format(parseISO(time), "H:mm") : null;
  });

  config.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true,
    };
    return slugify(input, options);
  });

  // Layout aliases
  config.addLayoutAlias("default", "layouts/base.liquid");

  // Static assets to pass through
  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/styles");
  config.addPassthroughCopy("./src/robots.txt");

  // 11ty error overlay
  // https://github.com/stevenpetryk/eleventy-plugin-error-overlay
  config.addPlugin(ErrorOverlay);

  // 404
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "src/_output",
    },
    passthroughFileCopy: true,
    templateFormats: ["md", "liquid"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
