import React from "react";

const categories = [
  { id: 9, name: "Généralités" },
  { id: 18, name: "Science: Informatique" },
  { id: 21, name: "Sport" },
  { id: 22, name: "Géographie" },
  { id: 23, name: "Histoire" },
];

const CategorySelector = ({ onSelectCategory }) => {
  const handleCategorySelection = (category) => {
    onSelectCategory(category.id); // Passe la catégorie choisie à l'appelant
  };

  return (
    <div>
      <h1>Sélectionnez une catégorie</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {categories.map((category) => (
          <button
            key={category.id}
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
