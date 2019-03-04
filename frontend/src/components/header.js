import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import logo from '../images/favicon.png';


function Header({ siteTitle, route_name }) {
  // const [isExpanded, toggleExpansion] = useState(false)
  const LeftArrow = () => <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 mr-2 fill-current' width='20px' height='20px' viewBox="0 0 20 20"><polygon points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"/></svg>

  return (
    <nav className="bg-blue antialiased">
      <div className="flex flex-wrap items-center justify-between max-w-xl mx-auto p-4 md:p-8">
        <Link to="/" className="flex items-center no-underline text-white ">
          {route_name && <LeftArrow /> }
          <img src={logo} alt="ferrytime logo" width="20" height="20" />
          <span className="font-bold text-xl tracking-tight mx-2">
            {siteTitle}
          </span>
        </Link>
      </div>
    </nav>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
