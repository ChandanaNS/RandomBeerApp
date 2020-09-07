import React from "react";
// import HeaderText from "../components/header.js";
import { api, URL } from "../components/api.js";

class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      brewery: false
    };
  }

  componentDidMount() {
    console.log("Main screen component mounted");
    this.loadRandomBeer();
  }

  // /**
  //  * @method loadRandomBeer
  //  * @description [Overview] Access random beer API
  //  * @param {This method does not require any parameters} void
  //  * @return void
  //  */
  loadRandomBeer() {
    api.getData(URL).then((response) => {
      let resData = response.data;
      if (resData !== undefined) {
        this.setState({
          data: resData,
          loading: false
        });
      }
    });
  }
  // /**
  //  * @method handleRoute
  //  * @description [Overview] Brewery details page
  //  * @param {True or False} Boolean
  //  * @return void
  //  */
  handleRoute = (showDetails) => {
    this.setState({
      brewery: showDetails
    });
  };
  render() {
    const data = this.state.data,
      loading = this.state.loading, //To check whether api data is available
      brewery = this.state.brewery; //To check whether to show brewery details
    return (
      <div className="container">
        <h1 className="d-flex justify-content-around">The Random Beer App</h1>
        <div id="container">
          {loading ? (
            <h1>Please wait while we find a random beer …</h1>
          ) : brewery ? (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => this.handleRoute(false)}
              >
                Back{" "}
              </button>
              <div className="card-group vgr-cards">
                <div className="card">
                  <div className="card-body">
                    <h4 className="my-2 text-white bg-dark">
                      {data ? data.breweries[0].name : "unknown"}
                    </h4>
                    <h5 className="text-primary">About Brewery</h5>
                    <p className="card-text ">
                      Started Year:
                      {data
                        ? data.breweries[0].locations[0].yearOpened
                        : "Start details not available"}
                    </p>
                    <p className="card-text text-info">
                      Location:
                      {data
                        ? data.breweries[0].locations.length
                        : "Start details not available"}
                    </p>
                    <div>
                      Location Details:
                      {
                        (this.locations = data.breweries[0].locations.map(
                          (item) => (
                            <div key={item.id}>
                              <ul>
                                <li>Name: {item.name}</li>
                                <li>Address: {item.streetAddress}</li>
                                <li>locality: {item.locality}</li>
                                <li>region: {item.region}</li>
                                <li>country: {item.country.name}</li>
                              </ul>
                              <hr />
                            </div>
                          )
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-info mb-2 "
                  onClick={() => this.loadRandomBeer()}
                >
                  Show another Beer
                </button>
              </div>
              <hr />
              <div className="card-group vgr-cards">
                <div className="card">
                  <div className="card-img-body">
                    {data.label ? (
                      <img className="card-img" src={data.label} alt="Card" />
                    ) : (
                      <img
                        className="card-img"
                        src="https://touch.daft.ie/static/images/fallbacks/no-image-size740x480.jpg"
                        alt="Card"
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <h4>{data ? data.name : "unknown"}</h4>
                    <p className="card-text">
                      {data && data.style
                        ? data.style["description"]
                        : "No description available"}
                    </p>
                    <h6
                      className="card-title"
                      onClick={() => this.handleRoute(true)}
                    >
                      Brewed by:{" "}
                      <b>
                        {data && data.breweries && data.breweries.length > 0
                          ? data.breweries[0].name
                          : "Brewery name not available"}
                      </b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainScreen;
