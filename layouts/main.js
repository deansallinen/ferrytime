import Header from '../components/header';
import Footer from '../components/footer'
import Meta from '../components/meta'

export default ({ children }) => (
  <div>
    <Meta />
    <Header />
    {children}
    <Footer />
  </div>
);
