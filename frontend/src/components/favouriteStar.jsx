import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO: switch to localforage for favourites

export default (props) => {
  const { routeName } = props;

  let favourites = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('favourites')) || [] : [];

  const [isFavourite, setFavourite] = useState(favourites && favourites.includes(routeName));
  const toggleFavourite = () => setFavourite(!isFavourite);
  useEffect(() => {
    if (favourites.includes(routeName) && !isFavourite) {
      favourites = favourites.filter(favourite => favourite !== routeName);
    }

    if (!favourites.includes(routeName) && isFavourite) {
      favourites = [routeName, ...favourites];
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [isFavourite]);

  const Star = ({ solid }) => (
    <FontAwesomeIcon icon={[solid ? 'fas' : 'far', 'star']} size="lg" />
  );

  return (
    <div className="icon" onClick={toggleFavourite}>
      {isFavourite ? <Star solid /> : <Star />}
    </div>
  );
};
