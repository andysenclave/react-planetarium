import axios from 'axios';
import { SEARCH_PLANETS } from './action.types';

const planetsUri = '/api/planets';
const radii = {
  max: 500,
  min: 50
};

export const searchPlanets = (name) => {
  const resource = `${planetsUri}?search=${name}`;

  return async (dispatch) => {
    let planets = [];
    try {
      const response = await axios.get(resource);
      planets = await response.data.results;
      if(typeof planets === 'object' && planets.length) {
        planets = await updatePlanets(planets);
      }
    } catch (e) {
      console.error("something went wrong : ", e);
    } finally {
      dispatch({
        type: SEARCH_PLANETS,
        payload: planets
      });
    }
  };
}

// finding a rescaled value to resize component using formula
//        (b-a)(x - min)
// f(x) = --------------  + a
//          max - min

const updatePlanets = (planets) => {
  const { max, min } = getPopulationRange(planets);
  return planets.map(planet => {
    let population = planet.population ? parseInt(planet.population, 10) : 0;
    const radius = (((radii.max - radii.min) * (population - min)) / (max - min)) + radii.min;
    return { radius, ...planet };
  });
}

const getPopulationRange = (planets) => {
  const initialRange = {
    max: planets[0].population || 0,
    min: planets[0].population || 0,
  };
  const range = planets.reduce((range, planet) => {
    let population = planet.population ? parseInt(planet.population, 10) : 0;
    if(range.max < population) range.max = population;
    if(range.min > population) range.min = population;
    return range;
  }, initialRange);
  return range;
}
