import { UPDATE_PLANETS } from './action.types';
import { config } from '../../config/app.config';

const { radii } = config;

// calculating a scaled radius to resize component using the following formula
//        (b-a)(x - min)
// f(x) = --------------  + a
//          max - min

export const updatePlanets = (planets) => {
  console.log("planets updated");
  const { max, min } = getPopulationRange(planets);
  
  let updatedPlanets = [];
  if(planets.length > 0) {
    updatedPlanets = planets.map(planet => {
      let population = planet.population ? parseInt(planet.population, 10) : 0;
      const radius = (((radii.max - radii.min) * (population - min)) / (max - min)) + radii.min;
      return { radius, ...planet };
    });
  }

  return (dispatch) => {
    dispatch({
      type: UPDATE_PLANETS,
      payload: updatedPlanets
    });
  };
}

const getPopulationRange = (planets) => {
  let initialRange = { max: 0, min: 0 };
  if(planets.length > 0) {
    initialRange = {
      max: planets[0].population,
      min: planets[0].population      
    }
  }
  const range = planets.reduce((range, planet) => {
    let population = planet.population ? parseInt(planet.population, 10) : 0;
    if(range.max < population) range.max = population;
    if(range.min > population) range.min = population;
    return range;
  }, initialRange);
  return range;
}
