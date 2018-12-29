import React from 'react';
import Layout from '../components/layout';
import Menu from '../components/menu';
import Favourites from '../components/favourites';


const IndexPage = () => (
  <Layout>
    <Favourites />
    <Menu />
  </Layout>
);
export default IndexPage;
