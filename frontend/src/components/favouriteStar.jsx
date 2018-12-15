import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default (props) => {
  const { routeName } = props;
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  const [isFavourite, toggleFavourite] = useState(favourites && favourites.includes(routeName));
  useEffect(() => {
    if (favourites.includes(routeName) && !isFavourite) {
      const newFavourites = favourites.filter(favourite => favourite !== routeName);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
    if (!favourites.includes(routeName) && isFavourite) {
      const newFavourites = [routeName, ...favourites];
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
  }, [isFavourite]);

  return (
      <div className="icon" onClick={() => toggleFavourite(!isFavourite)}>
          {isFavourite ? <FontAwesomeIcon icon={['fas', 'star']} /> : <FontAwesomeIcon icon={['far', 'star']} />}
        </div>
  );
};
