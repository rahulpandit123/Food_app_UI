import React from "react";

import "../Style/filter.css";
// import snakes from "../../public/Assets/Snakes.jpg";
import queryString from "query-string";
import axios from "axios";

class filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restuarants: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: undefined,
      page: 1,
      pageCount: [],
      mealtypeValue: undefined,
    };
  }

  componentDidMount() {
    //step 1 get the data from request params
    const qs = queryString.parse(this.props.location.search);

    console.log("This is qs - ", qs);
    const { mealtype, location, mealtypeValue, mealtypeCity } = qs;

    const reqObj = {
      mealtype: mealtype,
      location: location,
    };
    //step 2 make api call to get data from that meal type
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-Type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          mealtype: mealtype,
          location: location,
          pageCount: res.data.pageCount,
          mealtypeValue,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: "http://localhost:2020/locations",
      method: "GET",
      Headers: { "content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch();
  }
  handleSortChange = (sort) => {
    const { mealtype, location, lcost, hcost, page, cuisine } = this.state;
    const reqObj = {
      sort: sort,
      mealtype: mealtype,
      location: location,
      lcost,
      hcost,
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      page,
    };
    //step 2 make api call to get data from that meal type
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-Type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          sort: sort,
          pageCount: res.data.pageCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCostChange = (lcost, hcost) => {
    const { mealtype, location, sort, page, cuisine } = this.state;

    const reqObj = {
      sort: sort,
      mealtype: mealtype,
      location: location,
      lcost: lcost,
      hcost: hcost,
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      page,
    };
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-Type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          lcost,
          hcost,
          pageCount: res.data.pageCount,
        });
        console.log("Filter restuarants data -> ", res.data.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleLocationChange = (event) => {
    const { mealtype, sort, lcost, hcost, page, cuisine } = this.state;
    const location = event.target.value;

    const reqObj = {
      sort: sort,
      mealtype: mealtype,
      location: location,
      lcost: lcost,
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      hcost: hcost,
      page,
    };
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-Type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          location,
          pageCount: res.data.pageCount,
        });
        console.log("Filter restuarants data -> ", res.data.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handlePageChange = (page) => {
    const { mealtype, location, lcost, hcost, sort, cuisine } = this.state;

    const reqObj = {
      sort: sort,
      mealtype: mealtype,
      location: location,
      lcost,
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      hcost,
      page,
    };
    //step 2 make api call to get data from that meal type
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-Type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          page,
          pageCount: res.data.pageCount,
        });
        console.log("Pagenation loginc data ->", res.data.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleCuisineChange = (cuisineId) => {
    const { mealtype, location, lcost, hcost, page, sort, cuisine } =
      this.state;
    const index = cuisine.indexOf(cuisineId);
    if (index > -1) {
      cuisine.splice(index, 1);
    } else {
      cuisine.push(cuisineId);
    }
    const reqObj = {
      sort: sort,
      mealtype: mealtype,
      location: location,
      lcost,
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      hcost,
      page,
    };
    //step 2 make api call to get data from that meal type
    axios({
      url: "http://localhost:2020/filter",
      method: "POST",
      Headers: { "content-type": "application/json" },
      data: reqObj,
    })
      .then((res) => {
        this.setState({
          restuarants: res.data.restaurants,
          cuisine,
          pageCount: res.data.pageCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleNavigateDetails = (resId) => {
    this.props.history.push(`/details?restaurantId=${resId}`);
  };

  render() {
    const { restuarants, locations, pageCount, mealtypeValue } = this.state;
    return (
      <div classNameName='body2'>
        <br />
        <h1 className='title1'>{mealtypeValue} Places in Delhi</h1>
        <br />
        <div className='container'>
          <span className='Rectangle-5 col-lg-3 col-md-4 col-sm-10'>
            <div className='title mb-3'>
              <span id='one'>Filters</span>
              <span
                className='glyphicon glyphicon-chevron-down visible-span '
                id='two'
                data-toggle='collapse'
                data-target='#filter'></span>
              <a
                href='#filterCollapse'
                className='format visibleFilter collapsed'
                id='three'
                data-bs-toggle='collapse'
                aria-expanded='false'
                aria-controls='filterCollapse'></a>
            </div>
            <div id='filter' className='filter collapse-show'>
              <span className='filter collapse show' id='filter1'>
                <h3>Filters</h3>
                <h4>Select Location</h4>
                <select
                  className='RectSelect'
                  onChange={this.handleLocationChange}>
                  <option value={0}>Select Location</option>
                  {locations.map((item, index) => {
                    return (
                      <option key={index} value={item.location_id}>
                        {" "}
                        {`${item.name}, ${item.city}`}{" "}
                      </option>
                    );
                  })}

                  {/* <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Banglore</option>
                  <option>Pune</option> */}
                </select>
              </span>

              <span className='Selectmulti'>
                <h4>Cuisine</h4>
                <div>
                  <input
                    type='checkbox'
                    name='cuisine'
                    onChange={() => this.handleCuisineChange("1")}
                  />
                  <span> North Indian </span>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='cuisine'
                    onChange={() => this.handleCuisineChange("2")}
                  />
                  <span>South Indain </span>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='cuisine'
                    onChange={() => this.handleCuisineChange("3")}
                  />
                  <span> chinese </span>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='cuisine'
                    onChange={() => this.handleCuisineChange("4")}
                  />
                  <span> Fast Food </span>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='cuisine'
                    onChange={() => this.handleCuisineChange("5")}
                  />
                  <span> Street Food </span>
                </div>
              </span>
              <span className='selectOne'>
                <div className='Cost-for-two'>
                  <h4>Cost for Two</h4>{" "}
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(1, 500)}
                  />
                  <span>Less than &#8377; 500 </span>
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(500, 1000)}
                  />
                  <span>&#8377; 500 to &#8377; 1000 </span>
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(1000, 1500)}
                  />
                  <span>&#8377; 1000 to &#8377; 1500 </span>
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(1500, 2000)}
                  />
                  <span>&#8377; 1500 to &#8377; 2000</span>
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(2000, 5000)}
                  />
                  <span> &#8377; 2000+ </span>
                </div>
                <div>
                  <input
                    type='radio'
                    name='price'
                    onChange={() => this.handleCostChange(1, 5000)}
                  />
                  <span>ALL </span>
                </div>
              </span>
              <span className='sort'>
                {" "}
                <div id='Sort1'>Sort</div>
                <div>
                  <input
                    type='radio'
                    name='sort'
                    onChange={() => this.handleSortChange(1)}
                  />
                  <span>Price low to high</span>
                </div>
                <br />
                <div>
                  <input
                    type='radio'
                    name='sort'
                    onChange={() => this.handleSortChange(-1)}
                  />
                  <span>Price high to low </span>
                </div>
              </span>
            </div>
          </span>
          <span>
            <div
              className='Rectangle-6 res1 col-lg-9 col-md-6 col-sm-12 offset-lg-1'
              id='filter1'>
              {restuarants.length !== 0 ? (
                restuarants.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='restdata2'
                      onClick={() => this.handleNavigateDetails(item._id)}>
                      <span>
                        <img
                          src={`./${item.image}`}
                          alt='snakes'
                          className='image2'
                        />
                      </span>
                      <span>
                        <div className='Food-desc'>
                          <h3 clas='The-Big-Chill-Cakery' id='four'>
                            {item.name}
                          </h3>
                          <h3 className='Location1'>{item.locality}</h3>
                          <p>{item.city}</p>
                        </div>
                        <hr className='path' />
                        <br />
                        <div className='bill'>
                          <div className='CUISINES-COST-FOR-TWO '>
                            {" "}
                            CUSINES:{" "}
                            {item.cuisine.map(
                              (cuisine) => `${cuisine.name}, `
                            )}{" "}
                          </div>{" "}
                          <div className='CUISINES-COST-FOR-TWO '>
                            {" "}
                            COST FOR TWO:&#8377; {item.min_price}
                          </div>
                          {/* <div className='Bakery-700'> Bakery</div> */}
                          {/* <div className='Bakery-7001'> ₹ 700</div> */}
                        </div>
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className='no-msg'> No Records Found!! </div>
              )}

              {/*
              <div className='restdata'>
                <span>
                  { <img src={snakes} alt='snakes' className='image2' /> }
                </span>
                <span>
                  <div className='Food-desc'>
                    <h3 clas='The-Big-Chill-Cakery' id='four'>
                      The Bake Shop
                    </h3>
                    <h3 className='Location1'>FORT</h3>
                    <p>Shop 1, Plot D, Samruddhi Complex Chincholi</p>
                  </div>
                  <hr className='path' />
                  <br />
                  <div className='bill'>
                    <div className='CUISINES-COST-FOR-TWO '> CUSINES: </div>{" "}
                    <div className='CUISINES-COST-FOR-TWO '>
                      {" "}
                      COST FOR TWO:{" "}
                    </div>
                    <div className='Bakery-700'> Bakery</div>
                    <div className='Bakery-7001'> ₹ 700</div>
                  </div>
                </span>
              </div>
              */}
            </div>
          </span>
        </div>
        <br />

        {restuarants.length !== 0 ? (
          <div className='next-page'>
            {/* <button className='Rectangle-2330'> {"<"} </button> */}
            {pageCount.map((item) => {
              return (
                <span
                  className='Rectangle-2324'
                  onClick={() => this.handlePageChange(item)}>
                  <p>{item}</p>
                </span>
              );
            })}
            {/* <button className='Rectangle-2330'> {">"} </button> */}
          </div>
        ) : null}
      </div>
    );
  }
}

export default filter;
