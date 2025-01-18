import React from "react";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 18, name: "Science: Computer Science" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
];

const CategorySelector = ({ onSelectCategory }) => {
  const handleCategorySelection = (category) => {
    onSelectCategory(category.id); // Pass the selected category to the parent
  };

  return (
    <div className="category-container"> {/* Main container styled */}
      <h1 className="category-title">Select a Category</h1> {/* Styled title */}
      <div className="category-buttons"> {/* Button container */}
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-btn"
            onClick={() => handleCategorySelection(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
