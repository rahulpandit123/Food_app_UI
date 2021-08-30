import React from "react";
import "../Style/Home.css";
import axios from "axios";
// import Breakfast from "../images/Breakfast.jpg";
// import Dinner from "../images/Dinner.jpg";
// import Drinks from "../images/Drinks.jpg";
// import Lunch from "../images/Lunch.jpg";
// import Nightlife from "../images/Nightlife.jpg";

// import snakes from "../images/snakes.jpg";
import QuickSearch from "./QuickSearch";
import Walpaper from "./Walpaper";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealTypes: [],
    };
  }
  componentDidMount() {
    sessionStorage.clear();
    axios({
      url: "http://localhost:2020/locations",
      method: "GET",
      Headers: { "content-type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch();

    axios({
      url: "http://localhost:2020/mealtypes",
      method: "GET",
      Headers: { "content-type": "application/json" },
    })
      .then((response) => {
        this.setState({ mealTypes: response.data.mealType });
        console.log("MealType data of Home -> ", response.data.mealType);
      })
      .catch();
  }
  render() {
    const { locations, mealTypes } = this.state;
    console.log("Locations data transfer to noweher -> ", locations);
    console.log(
      "MealType data transfer to QuickSearch component -> ",
      mealTypes
    );
    return (
      <div>
        <Walpaper locationData={locations} />
        <QuickSearch QuickSearchData={mealTypes} />
      </div>
    );
  }
}

export default Home;
