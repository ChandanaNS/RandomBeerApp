const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const KEY = "a5c1b917e7ba62dcd79f434ed73bc72d";
const BREWERYPARAM = "withBreweries=Y&hasLabels=Y";
const LABELPARAM = "hasLabels=Y";
const URL = `${CORS_ANYWHERE}https://api.brewerydb.com/v2/beer/random?${BREWERYPARAM}&${LABELPARAM}&key=${KEY}`;

let api = {
  async getData(x) {
    return await fetch(x)
      .then((response) => response.json())
      .catch(
        (error) =>
          (document.getElementById(
            "container"
          ).textContent = `Technical error has occurred: ${error}`)
      );
  }
};

export { api, URL };
