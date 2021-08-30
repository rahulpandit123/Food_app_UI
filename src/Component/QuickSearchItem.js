import React from "react";
// import Breakfast from "./Assets/Breakfast.jpg";
// import Lunch from "./Assets/Lunch.jpg";
import "../Style/Home.css";
import { withRouter } from "react-router-dom";

class QuickSearchItem extends React.Component {
  handleNavigate = (mealtype, mealtypeValue, mealtypeCity) => {
    const locationId = sessionStorage.getItem("location");
    if (locationId) {
      this.props.history.push(
        `/filter?mealtype=${mealtype}&location=${locationId} &mealtypeValue=${mealtypeValue}`
      );
    } else {
      this.props.history.push(
        `/filter?mealtype=${mealtype} &mealtypeValue=${mealtypeValue} `
      );
    }
  };
  render() {
    const { qsItemData, key } = this.props;
    console.log("qsItemData output -> ", qsItemData);
    console.log(qsItemData.image);
    return (
      <div
        key={key}
        className='col-sm-12 col-md-6 col-lg-4'
        onClick={() =>
          this.handleNavigate(qsItemData.meal_type, qsItemData.name)
        }>
        <div className='tileContainer'>
          <div className='tileComponent1'>
            <img
              src={`./${qsItemData.image}`}
              alt='qsimage'
              height='150'
              width='140'
            />
          </div>
          <div className='tileComponent2'>
            <div className='componentHeading'>{qsItemData.name}</div>
            <div className='componentSubHeading'>{qsItemData.content}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(QuickSearchItem);
