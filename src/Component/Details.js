import React from "react";
import "../Style/Details.css";
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Breakfast from "../image/Breakfast.jpg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#60ecd9d4",
  },
};

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restuarant: {},
      restaurantId: undefined,
      itemsModalIsOpen: false,
      galleryModalIsOpen: false,
      userDetailModalIsOpen: false,
      itemsList: [],
      subTotal: 0,
      name: undefined,
      email: undefined,
      contactNumber: undefined,
      address: undefined,
    };
  }

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { restaurantId } = qs;

    axios({
      url: `https://zoomato-backend.herokuapp.com/getRestaurantDetailsById/${restaurantId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        this.setState({ restuarant: res.data.restaurants, restaurantId });
        console.log(
          "This is respone of Details Page ->>   ",
          res.data.restaurant
        );
      })
      .catch((err) => {
        console.log("GetREsturant By ID Error -> ", err);
      });
  }

  handleOrder = () => {
    const { restaurantId } = this.state;
    axios({
      url: `https://zoomato-backend.herokuapp.com/menuItems/${restaurantId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        this.setState({
          itemsList: res.data.items,
          itemsModalIsOpen: true,
          subTotal: 0,
        });
        console.log(
          "This is respone of Details Page ->>   ",
          res.data.restaurant
        );
      })
      .catch((err) => {
        console.log("GetREsturant By ID Error -> ", err);
      });
  };
  handleCloseModal = (state, value) => {
    this.setState({ [state]: value });
  };

  addItems = (index, operationType) => {
    let total = 0;
    const items = [...this.state.itemsList];
    const item = items[index];

    if (operationType == "add") {
      item.qty = item.qty + 1;
    } else {
      item.qty = item.qty - 1;
    }
    items[index] = item;
    items.map((item) => {
      total += item.qty * item.price;
    });
    this.setState({ itemsList: items, subTotal: total });
  };

  handleGallery = () => {
    this.setState({ galleryModalIsOpen: true });
  };

  handlePay = () => {
    this.setState({ userDetailModalIsOpen: true, itemsModalIsOpen: false });
  };
  handleInputChange = (event, state) => {
    this.setState({ [state]: event.target.value });
  };

  isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  isObj = (val) => {
    return typeof val === "object";
  };

  stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", this.stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  };

  post = (details) => {
    const form = this.buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  getData = (data) => {
    return fetch(`https://zoomato-backend.herokuapp.com/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  payment = () => {
    const { email, subTotal } = this.state;
    this.getData({ amount: subTotal, email }).then((response) => {
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response,
      };
      this.post(information);
    });
  };

  render() {
    const {
      restuarant,
      itemsModalIsOpen,
      itemsList,
      subTotal,
      galleryModalIsOpen,
      userDetailModalIsOpen,
      name,
      email,
      contactNumber,
      address,
    } = this.state;
    return (
      <div>
        <div>
          {/* <img
            src={"Breakfast"}
            alt='No Image'
            style={{
              width: "100%",
              height: "400px",
            }}
          /> */}
          <img
            src={`./${restuarant.image}`}
            alt='NoPhoto Sorry for the Inconvinience'
            width='100%'
            height='400'
          />

          <button className='button' onClick={this.handleGallery}>
            Click to see Image Gallery
          </button>
        </div>
        <div className='heading'>{restuarant.name}</div>
        <button className='btn-order' onClick={this.handleOrder}>
          Place Online Order
        </button>

        <div className='tabs'>
          <div className='tab'>
            <input type='radio' id='tab-1' name='tab-group-1' checked />
            <label for='tab-1'>Overview</label>

            <div className='content'>
              <div className='about'>About this place</div>
              <div className='head'>Cuisine</div>
              <div className='value'>
                {restuarant &&
                  restuarant.cuisine &&
                  restuarant.cuisine.map((item) => `${item.name},`)}
              </div>
              <div className='head'>Average Cost</div>
              <div className='value'>
                &#8377; {restuarant.min_price} for two people(approx)
              </div>
            </div>
          </div>

          <div className='tab'>
            <input type='radio' id='tab-2' name='tab-group-1' />
            <label for='tab-2'>Contact</label>

            <div className='content'>
              <div className='head'>Phone Number</div>
              <div className='value'>{restuarant.contact_number}</div>
              <div className='head'>{restuarant.name}</div>
              <div className='value'>{`${restuarant.locality}, ${restuarant.city}`}</div>
            </div>
          </div>
        </div>
        <Modal isOpen={itemsModalIsOpen} style={customStyles}>
          <div>
            <div
              className='glyphicon glyphicon-remove'
              style={{ float: "right", margin: "5px" }}
              onClick={() =>
                this.handleCloseModal("itemsModalIsOpen", false)
              }></div>
            <div>
              <h3 className='restaurant-name'>{restuarant.name}</h3>
              <h3 className='item-total'>SubTotal : {subTotal}</h3>
              <button className='btn btn-danger pay' onClick={this.handlePay}>
                {" "}
                Pay Now
              </button>
              {itemsList.map((item, index) => {
                return (
                  <div
                    style={{
                      width: "44rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderBottom: "2px solid #dbd8d8",
                    }}>
                    <div
                      className='card'
                      style={{ width: "43rem", margin: "auto" }}>
                      <div
                        className='row'
                        style={{ paddingLeft: "10px", paddingBottom: "10px" }}>
                        <div
                          className='col-xs-9 col-sm-9 col-md-9 col-lg-9 '
                          style={{
                            paddingLeft: "10px",
                            paddingBottom: "10px",
                          }}>
                          <span className='card-body'>
                            <h5 className='item-name'>{item.name}</h5>
                            <h5 className='item-price'>&#8377;{item.price}</h5>
                            <p className='item-descp'>{item.description}</p>
                          </span>
                        </div>
                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                          {" "}
                          <img
                            src={`../${item.image}`}
                            alt=''
                            className='card-img-center title-img'
                            style={{
                              height: "75px",
                              width: "75px",
                              "border-radius": "20px",
                            }}
                          />
                          {item.qty === 0 ? (
                            <div>
                              <button
                                className='add-button'
                                onClick={() => this.addItems(index, "add")}>
                                Add
                              </button>
                            </div>
                          ) : (
                            <div className='add-number'>
                              <button
                                onClick={() =>
                                  this.addItems(index, "subtract")
                                }>
                                -
                              </button>
                              <span style={{ backgroundColor: "white" }}>
                                {item.qty}
                              </span>
                              <button
                                onClick={() => this.addItems(index, "add")}>
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className='card'
                style={{
                  width: "44rem",
                  marginTop: "10px",
                  marginBottom: "10px",
                  margin: "auto",
                }}></div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={galleryModalIsOpen} style={customStyles}>
          <div
            className='glyphicon glyphicon-remove'
            style={{ float: "right", margin: "5px" }}
            onClick={() =>
              this.handleCloseModal("galleryModalIsOpen", false)
            }></div>
          <div>
            <Carousel showThumbs={false}>
              {restuarant &&
                restuarant.thumb &&
                restuarant.thumb.map((item) => {
                  return (
                    <div>
                      <img
                        src={`./${item}`}
                        alt='qsimage'
                        width='200px'
                        height='500px'
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </Modal>

        <Modal isOpen={userDetailModalIsOpen} style={customStyles}>
          <div
            className='glyphicon glyphicon-remove'
            style={{ float: "right", margin: "5px" }}
            onClick={() =>
              this.handleCloseModal("userDetailModalIsOpen", false)
            }></div>
          <div>
            <label>Name</label>
            <input
              type='text'
              class='form-control'
              placeholder='Enter Name'
              style={{ width: "400px" }}
              value={name}
              onChange={(event) => this.handleInputChange(event, "name")}
            />
            <label>Email Address</label>
            <input
              type='email'
              class='form-control'
              placeholder='Enter email address'
              style={{ width: "400px" }}
              value={email}
              onChange={(event) => this.handleInputChange(event, "email")}
            />
            <label>Contact Number</label>
            <input
              type='phone'
              class='form-control'
              placeholder='Enter Contact Details'
              style={{ width: "400px" }}
              value={contactNumber}
              onChange={(event) =>
                this.handleInputChange(event, "contactNumber")
              }
            />
            <label>Enter Address</label>
            <input
              type='text'
              class='form-control'
              placeholder='Enter your address'
              style={{ width: "400px" }}
              value={address}
              onChange={(event) => this.handleInputChange(event, "address")}
            />
            <button
              class='btn btn-sm btn-danger'
              style={{ float: "right", margin: "10px" }}
              onClick={this.payment}>
              {" "}
              Proceed
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Details;
