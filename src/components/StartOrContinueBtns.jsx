import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function StartOrContinueBtns({ id, isFoodOrDrink }) {
  const history = useHistory();
  const doneRecipesAtLocalStorage = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(doneRecipesAtLocalStorage);

  const recipesInProgressAtLocalStorage = localStorage.getItem('inProgressRecipes');
  const recipesInProgress = JSON.parse(recipesInProgressAtLocalStorage);

  const [isRecipeStarted, setIsRecipeStarted] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  useEffect(() => {
    const anyRecipe = () => {
      if (doneRecipes) {
        setIsRecipeStarted(doneRecipes
          .some((doneRecipe) => Number(doneRecipe.id) === Number(id)));
      }
      if (recipesInProgress) {
        setIsRecipeInProgress(Object.keys(recipesInProgress.meals
          || recipesInProgress.cocktails)
          .some((recipe) => recipe === id));
      }
    };
    anyRecipe();
  });

  const startRecipe = () => {
    setIsRecipeStarted((prev) => !prev);
    history.push(`/${isFoodOrDrink}/${id}/in-progress`);
  };
  const continueRecipe = () => {
  };

  return (
    <div>
      {!isRecipeStarted && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipe }
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
        >
          Start Recipe
        </button>
      )}
      {isRecipeInProgress && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
          onClick={ continueRecipe }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}

StartOrContinueBtns.propTypes = {
  id: PropTypes.string,
  isFoodOrDrink: PropTypes.string,
}.isRequired;
