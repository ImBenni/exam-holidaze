import { useState } from 'react';
import styles from './SortVenues.module.scss';

function SortVenues({ venues, setVenues }) {
  const [sortType, setSortType] = useState('recentlyCreated');

  const sortVenues = (venues, sortType) => {
    let sortedVenues = [...venues];
    if (sortType === 'recentlyCreated') {
      sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortType === 'highestRated') {
      sortedVenues.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'lowestPrice') {
      sortedVenues.sort((a, b) => a.price - b.price);
    } else if (sortType === 'highestPrice') {
      sortedVenues.sort((a, b) => b.price - a.price);
    }
    return sortedVenues;
  };

  const handleSortChange = (event) => {
    const newSortType = event.target.value;
    setSortType(newSortType);
    const sortedVenues = sortVenues(venues, newSortType);
    setVenues(sortedVenues);
  };

  return (
    <div className={styles.sortingContainer}>
      <select className={styles.sortingSelect} value={sortType} onChange={handleSortChange}>
        <option value="recentlyCreated">Recently Created</option>
        <option value="highestRated">Highest Rated</option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="highestPrice">Highest Price</option>
      </select>
    </div>
  );
}

export default SortVenues;
