const slugify = require('slugify');
const { parseISO, format } = require('date-fns');

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    'liquid',
    // Static Assets:
    'css',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2',
  ]);
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addLayoutAlias('default', 'layouts/base.liquid');
  eleventyConfig.addFilter('departureTerminal', (routeName) => {
    const [departureTerminal, arrivalTerminal] = routeName.split(' to ');
    return departureTerminal;
  });

  eleventyConfig.addFilter('arrivalTerminal', (routeName) => {
    const [departureTerminal, arrivalTerminal] = routeName.split(' to ');
    return arrivalTerminal;
  });

  eleventyConfig.addFilter('jsonify', (input) =>
    JSON.stringify(input, null, 2),
  );

  eleventyConfig.addFilter('latestStatus', (sailings) => {
    const { sailing_status } = Object.values(sailings).reduce((acc, cur) =>
      cur.actual_departure ? cur : acc,
    );
    if (
      !['On Time', 'Cancelled', '', null, undefined].includes(sailing_status)
    ) {
      return 'Delayed';
    } else {
      return sailing_status;
    }
  });

  eleventyConfig.addFilter('formatTime', (time) => {
    return time ? format(parseISO(time), 'H:mm') : null;
  });

  eleventyConfig.addFilter('slug', (input) => {
    const options = {
      replacement: '-',
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true,
    };
    return slugify(input, options);
  });

  return {
    dir: {
      input: '_template',
      includes: '../_includes',
      output: '_output',
    },
  };
};
