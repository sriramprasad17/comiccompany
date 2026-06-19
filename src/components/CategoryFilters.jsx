import React from 'react';

export default function CategoryFilters({ currentCategory, onSelectCategory }) {
  const categories = ['All', 'Marvel', 'DC', 'Disney', 'Fantasy', 'Horror', 'Adventure', 'Crime Thriller'];

  return (
    <div className="filter-chips">
      {categories.map(cat => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelectCategory(cat)}
          className={`filter-chip ${currentCategory === cat ? 'active' : ''}`}
        >
          {cat === 'All' ? 'All Genres' : cat}
        </button>
      ))}
    </div>
  );
}
