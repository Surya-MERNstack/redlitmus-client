import "../Pages/Css/App.css";

function Footer() {
  return (
    <div>
      <div className="row lastdiv mx-0">
        <div className="col-sm-3">
          <h6>COMPANY</h6>
          <p>About us</p>
          <p>Team</p>
          <p>Careers</p>
          <p>Swiggy Blog</p>
          <p>Bug Bounty</p>
          <p>Swiggy One</p>
          <p>Swiggy Corporate</p>
          <p>Swiggy Instamart</p>
          <p>Swiggy Genie</p>
        </div>
        <div className="col-sm-3">
          <h6>CONTACT</h6>
          <p>Help & Support</p>
          <p>Partner with us</p>
          <p>Ride with us</p>
        </div>
        <div className="col-sm-3">
          <h6>LEGAL</h6>
          <p>Terms & Conditions</p>
          <p>Refund & Cancellation</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Offer Terms</p>
          <p>Phishing & Fraud</p>
          <p>Corporate – Swiggy Money Codes Terms and Conditions</p>
          <p>Corporate - Swiggy Discount Voucher Terms and Conditions</p>
        </div>
        <div className="col-sm-3 playstore">
          <br />
          <br />
          <a
            className="m-5"
            href="https://itunes.apple.com/in/app/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage"
          >
            <img alt="AppStore" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv" />
          </a>
          <br />
          <br />
          <a
            className="m-5"
            href="https://play.google.com/store/apps/details?id=in.swiggy.android&amp;referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
          >
            <img alt="GooglePlay" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
