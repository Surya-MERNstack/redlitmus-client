import React from "react";
import "./Css/OrderCard.css"

function OrderCard(data) {
    let TotalPrice=0;
  return (
    <div className="col-12 AddressBox mt-4 mb-3 ms-2">
      <h6 className="col-6 text-secondary">{data.orderDate}</h6>
      <div className="row">
        <div className="col-3">
          <p>
            <b>Dish</b>
          </p>
        </div>
        <div className="col-3 Restaurantorderheading">
          <p>
            <b>Restaurant </b>
          </p>
        </div>
        <div className="col-3">
          <p>
            <b>Quantity</b>
          </p>
        </div>
        <div className="col-3">
          <p>
            <b>Price</b>
          </p>
        </div>
      </div>
      {
        data.OrderDetails.map((item) =>{
            TotalPrice += item.quantity *item.price;
            return ( <div className="row text-secondary">
        <div className="col-3">
          <p>
          {item.dish_name}
          </p>
        </div>
        <div className="col-3">
          <p>
          {item.res_name}
          </p>
        </div>
        <div className="col-3">
          <p>
          {item.quantity}
          </p>
        </div>
        <div className="col-3">
          <p>
          {item.quantity *item.price}
          </p>
        </div>
      </div>
        )})
      }
      <div className="TotalPriceDiv mt-2"><h6 className="TotalPrice mt-2">Total Price : {TotalPrice}</h6></div>
    </div>
  );
}

export default OrderCard;
