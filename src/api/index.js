// export const getUsers = (page) => {
//   return fetch(`https://randomuser.me/api/?seed=abc&results=10&nat=ua&page=${page}`)
//     .then(response => response.json());
// }


// export const getUsers = (options) => {
//   const { results = 10, nat = 'gb', page = 1, seed = 'abc' } = options;
//   return fetch(`https://randomuser.me/api/?seed=${seed}&results=${results}&nat=${nat}&page=${page}&nat=${nat}`)
//     .then(response => response.json());
// }

import queryString from "query-string";
import { API_DEFAULT_NAT, API_DEFAULT_PAGE, API_DEFAULT_RESULTS, API_DEFAULT_SEED, BASE_URL } from "../config";

/**
 * 
 * @param {Object} options 
 * @param {number} options.results
 * @param {string} options.nat
 * @param {number} options.page
 * @param {string} options.seed
 * @returns {Promise}
 */

export const getUsers = (options) => {
  const defaultOptions = { 
    results:  API_DEFAULT_RESULTS, 
    nat: API_DEFAULT_NAT, 
    page: API_DEFAULT_PAGE, 
    seed: API_DEFAULT_SEED 
  };

  const finalyOptions = {
    ...defaultOptions,
    ...options
  }

  return fetch(`${BASE_URL}?${queryString.stringify(finalyOptions)}`)
    .then(response => response.json());
}