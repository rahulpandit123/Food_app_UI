import React from "react";

import "../Style/Home.css";
// import Breakfast from "../images/Breakfast.jpg";
// import Dinner from "../images/Dinner.jpg";
// import Drinks from "../images/Drinks.jpg";
// import Lunch from "../images/Lunch.jpg";
// import Nightlife from "../images/Nightlife.jpg";

// import snakes from "../images/snakes.jpg";
import QuickSearchItem from "./QuickSearchItem";

class QuickSearch extends React.Component {
  render() {
    const { QuickSearchData } = this.props;
    return (
      <div>
        <div className='Quick-Searches'>Quick Search</div>
        <div className='sub-header'>Discover restraunts by type of meal</div>
        <div className='container-fluid'>
          <div className='row'>
            {QuickSearchData.map((item, index) => {
              return <QuickSearchItem key={index} qsItemData={item} />;
            })}

            {/* <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={Breakfast}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> Breakfast </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={Lunch}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> Launch </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={snakes}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> Snakes </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={Dinner}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> Dinner </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={Drinks}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> Drink </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div> */}
            {/* <div class='col-lg-4 col-md-6 col-sm-12 qs-item'>
              <div class='box'>
                <img
                  src={Nightlife}
                  alt='Breakfast'
                  class='image'
                  width='140px'
                  height='180px'
                  object-fill='fill'
                />
                <div class='food-desc'>
                  <p class='food-title'> NightLife </p>
                  <p class='food-detail'>
                    Start your day with exclusive Breakfast{" "}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default QuickSearch;
