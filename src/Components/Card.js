import "./Css/Card.css";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Card(data) {
  const navigate = useNavigate();
  const popoverRef = useRef(null);
  function QuickView() {
    const formattedContent = data.dishes.join("<br/>");
    const popoverElement = popoverRef.current;
    const popover = new window.bootstrap.Popover(popoverElement, {
      trigger: "hover",
      content: formattedContent,
      html: true,
    });
    return () => {
      popover.dispose();
    };
  }
  return (
    <div className="col-lg-3 col-md-6 carddiv">
      <div className="card mt-4 cardcard">
        <Link to={`/details/${data.id}`}>
          <img className="Avatar" src={data.image} alt="Avatar" />
          <div className="RestaurantName mt-3 mb-2">
            <h4 className="text-secondary">
              <b>{data.res_name}</b>
            </h4>
          </div>
          <div className="borerDiv"></div>
          <div className="mt-3 offerDetails">
            <p className="mx-2">
              <span id="rating" className="mx-1">
                <i className="fa-solid fa-star me-1"></i>
                {data.rating}
              </span>{" "}
              <span className="">{data.offer}% off </span>|{" "}
              <span className="">{data.coupon.toUpperCase()}</span>
            </p>
          </div>
        </Link>
        <div>
          <button
            ref={popoverRef}
            type="button"
            className="btn btn-outline-light text-primary Quickview mb-2 desktop"
            title="MENU"
            data-bs-toggle="popover"
            data-bs-content="Some content inside the popover"
            data-bs-trigger="hover"
            onMouseEnter={QuickView}
          >
            Quick view
          </button>
          <button
           className="btn btn-outline-light text-primary Quickview mb-2 mobile"
            onClick={()=>(navigate(`/details/${data.id}`))}
          >
            Quick view
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
