import React from "react";
import HomePageTitle from "../image/HomePageTitle.jpg";

import "../Style/Home.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Walpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputTxt: "",
      suggestions: [],
    };
  }

  handleChange = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem("location", locationId);

    axios({
      url: `http://localhost:2020/restaurantsbylocation/${locationId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ restaurants: response.data.restaurants });
      })
      .catch();
  };

  handleInputChange = (event) => {
    const input = event.target.value;
    const { restaurants } = this.state;

    let filteredRes = [];

    if (input.length > 0) {
      console.log("Restraunt for search item => ", restaurants);
      filteredRes = restaurants.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
    }
    this.setState(() => ({
      suggestions: filteredRes,
      inputTxt: input,
    }));
  };

  selectedText = (restuarant) => {
    this.props.history.push(`/details?restaurantId=${restuarant._id}`);
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;

    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            className='suggestionItem'
            key={index}
            onClick={() =>
              this.selectedText(item)
            }>{`${item.name}, ${item.city}`}</li>
        ))}
      </ul>
    );
  };

  render() {
    const { locationData } = this.props;
    const { restaurants, inputTxt } = this.state;
    console.log("LocationData -> ", locationData);
    return (
      <div>
        <header classNameName='container1'>
          <img src={HomePageTitle} alt='Homepage' width='100%' height='400px' />
          <div className='logo'> e! </div>
          <div className='text'> Find the best restraunts, cafes, and bars</div>

          <div className='select-location'>
            <select className='Bengaluru' onChange={this.handleChange}>
              <option value='0'>Select </option>
              {locationData.map((item, index) => {
                return (
                  <option key={index} value={item.location_id}>
                    {" "}
                    {`${item.name}, ${item.city}`}{" "}
                  </option>
                );
              })}
            </select>

            <div className='search'>
              {/* <!-- glyphicon glyphicon-search --> */}
              <span className='fas fa-search searchicon '></span>
              <input
                id='query'
                type='text'
                className='enter-restraunt1'
                placeholder='Please Enter Restaurant Name'
                value={inputTxt}
                onChange={this.handleInputChange}
              />
              {this.renderSuggestions()}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(Walpaper);
