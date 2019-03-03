import React, { useState, useEffect } from 'react';
import useFavouriteRoute from '../components/useFavourite';

export default ({ routeName }) => {
  const [favourites, setFavourites] = useState(
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : []
  );

  const [isFavourite, setFavourite] = useState(
    favourites && favourites.includes(routeName)
  );

  const toggleFavourite = () => setFavourite(!isFavourite);

  useEffect(() => {
    if (favourites.includes(routeName) && !isFavourite) {
      setFavourites(favourites.filter(favourite => favourite !== routeName));
    }

    if (!favourites.includes(routeName) && isFavourite) {
      setFavourites([routeName, ...favourites]);
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [isFavourite]);

  return isFavourite ? (
    <button
      className=" m-2 rounded-lg  bg-white text-blue transition text-3xl"
      onClick={toggleFavourite}
    >
      <span>&#9733;</span>
    </button>
  ) : (
    <button
      className=" m-2 rounded-lg  bg-white text-blue transition text-3xl"
      onClick={toggleFavourite}
    >
      &#9734;
    </button>
  );
};
