import React, { useState, useEffect } from "react";
import "./Css/DishCard.css";
import { CartAPI } from "../Api/api";
function DishCard(data) {
  const [cartData, setCartData] = useState(data);
  function AddCart(cartData) {
    const updatedCartData = {
      ...cartData,
      quantity: +cartData.quantity + 1,
    };
    setCartData(updatedCartData);
    CartAPI(updatedCartData);
    // data.onFilteritemListChange(updatedCartData);
  }
  function MinusCart(cartData) {
    const updatedCartData = {
      ...cartData,
      quantity: +cartData.quantity - 1,
    };
    setCartData(updatedCartData);
    CartAPI(updatedCartData);
    // data.onFilteritemListChange(updatedCartData);
  }

  return (
    <div className="dishCardBorder mt-3">
      <div>
        <div className="row mt-2">
          <div className="col-2">
            <img
              src={cartData.image}
              className="list-image rounded float-left "
              alt="list"
            />
            <div className=" ps-1 goldStarDiv">
              <p>
                <i
                  className={`fa fa-star ${
                    cartData.rating >= 1 ? "goldStar" : " "
                  }`}
                ></i>
                <i
                  className={`fa fa-star ${
                    cartData.rating >= 2 ? "goldStar" : " "
                  }`}
                ></i>
                <i
                  className={`fa fa-star ${
                    cartData.rating >= 3 ? "goldStar" : " "
                  }`}
                ></i>
                <i
                  className={`fa fa-star ${
                    cartData.rating >= 4 ? "goldStar" : " "
                  }`}
                ></i>
                <i
                  className={`fa fa-star ${
                    cartData.rating >= 5 ? "goldStar" : " "
                  }`}
                ></i>
              </p>
            </div>
          </div>
          <div className="col -7 mt-1 resname text-secondary">
            <h5 className="">{cartData.res_name}</h5>
            <div className=" foodname mt-3">
              <h6>{cartData.dishName}</h6>
            </div>

            <div className="col-3 pricename text-secondary">
              <p>
                ₹{" "}
                {cartData.quantity > 0
                  ? cartData.quantity * cartData.price
                  : cartData.price}
              </p>
            </div>
          </div>
          <div className="col-4 dishCardAddMinusDiv">
            <div className="row mt-2">
              <div>
                {cartData.quantity > 0 ? (
                  <div className="plusminusdiv">
                    <button
                      className="btn btn-outline-danger plusminus"
                      onClick={() => MinusCart(cartData)}
                    >
                      -
                    </button>
                    <span className="quantity mx-1 plusminus">
                      {cartData.quantity}
                    </span>
                    <button
                      className="btn btn-outline-danger plusminus"
                      onClick={() => AddCart(cartData)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="addonly">
                    <button
                      className="btn btn-outline-danger "
                      onClick={() => AddCart(cartData)}
                    >
                      <span className="Addrow">Add+</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
