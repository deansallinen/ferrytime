import React, { useState, useEffect } from 'react';

export default ({ routeName }) => {
  let favourites =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : [];

  const [isFavourite, setFavourite] = useState(
    favourites && favourites.includes(routeName)
  );

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

  return (
    <button
      className=" py-4 px-6 rounded-lg shadow hover:shadow-md bg-blue text-white"
      onClick={toggleFavourite}
    >
      Add to favourites
    </button>
  );
};
