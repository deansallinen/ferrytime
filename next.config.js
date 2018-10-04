const { request } = require('graphql-request');
module.exports = {
  async exportPathMap() {
    const URL = 'https://server-sphnxiurqx.now.sh/graphql';
    const query = `{
            allRoutes {
              routeName
            }
          }`;
    const res = await request(URL, query);
    console.log(res.allRoutes);
    const pages = res.allRoutes.reduce((pages, post) => {
      //   console.log('pre ', pages);
      return {
        ...pages,
        [`/post?id=${post.routeName}`]: {
          page: '/post',
          query: { id: post.routeName }
        }
      };
    }, {});
    // console.log('pages ', pages);
    const obj = { ...pages, '/': { page: '/' } };
    console.log(obj);
    return obj;
  }
};
