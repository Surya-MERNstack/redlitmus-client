import React, { useEffect, useState } from "react";
import HomeHeader from "../Components/HomeHeader";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import "./Css/Profile.css";
import { ViewOrders, ViewProfile, EditProfile, SaveAddress, EditAddressAPI } from "../Api/api";
import AddressCard from "../Components/AddressCard";
import OrderCard from "../Components/OrderCard";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [buttonClick, setbuttonClick] = useState(1);
  const [itemListProfile, setItemListProfile] = useState([]);
  const [editProfile, SetEditProfile] = useState([]);
  const [itemListOrders, setItemListOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [addAddress, SetaddAddress] = useState({
    flatno: "",
    street: "",
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function Profile() {
      try {
        const items = await ViewProfile();
        if (items === "login") {
          // alert("Session Expired");
          // new AWN().warning('Session Expired', {durations: {success: 0}})
          toast.warn('😔 Session Expired', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

          navigate("/");
        }
        setItemListProfile(items.data);
        SetEditProfile({
          name: items.data.name,
          phone: items.data.phone,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    Profile();
  }, []);

  async function Orders() {
    setbuttonClick(2);
    try {
      setIsLoadingOrders(true);
      const item = await ViewOrders();
      if (item === "login") {
        // alert("Session Expired");
        // new AWN().warning('Session Expired', {durations: {success: 0}})
        toast.warn('😔 Session Expired', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate("/");
      }
      setItemListOrders(item.data);
      setIsLoadingOrders(false);
    } catch (error) {
      console.error(error);
    }
  }

  function Logout() {
    const confirmed = toast.success("🥳 Logout  Successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
    if (confirmed) {
      navigate("/");
    }
  }
  function HandleEdit(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    SetEditProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function SaveEdit() {
    try {
      setItemListProfile((prevState) => ({
        ...prevState,
        name: editProfile.name,
        phone: editProfile.phone,
      }));
      const items = await EditProfile(editProfile);
      if (items === "login") {
        // alert("Session Expired");
        // new AWN().warning('Session Expired', {durations: {success: 0}})
        toast.warn('😔 Session Expired', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  function HandleAddAdress(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    SetaddAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function AddAddress() {
    try {
      setButtonDisabled(true);
      const reponse = await SaveAddress(addAddress);
      if (reponse === "login") {
        // alert("Session Expired");
        // new AWN().warning('Session Expired', {durations: {success: 0}})
        toast.warn('😔 Session Expired', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate("/");
      }
      else if (reponse === false) {
        // alert("Unable to add address, Please try again");
        // new AWN().warning('Unable to add address, Please try again', {durations: {success: 0}})
        toast.warn('😔 Unable to add address, Please try again', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

      }  
      else if (reponse === true) {
        // alert("Address added successfully");
        // new AWN().success('Address added successfully', {durations: {success: 0}})
        toast.warn('🥳 Address added successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // alert("Session Expired");
      // new AWN().warning('Session Expired', {durations: {success: 0}})
      toast.warn('😔 Session Expired', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate("/");
    }
  }
  const [editAddress, seteditAddress] = useState({});
  function handleAddressEditData(event) {
    const name = event.target.name;
    const value = event.target.value;
    seteditAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function setEditAddressData(value) {
    seteditAddress({
      id:value.id,
      flatno: value.flatno,
      street: value.street,
      area: value.area,
      city: value.city,
      state: value.state,
      country: value.country,
      pincode: value.pincode,
      isPrimary:value.isPrimary
    });
  }

  async function EditAddres(editAddress) {
    try {
      setButtonDisabled(true);
      const reponse = await EditAddressAPI(editAddress);
      if (reponse === "login") {
        // alert("Session Expired");
        // new AWN().warning('Session Expired', {durations: {success: 0}})
        toast.warn('😔 Session Expired', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate("/");
      }
      else if (reponse === false) {
        // alert("Unable to set primary address, Please try again");
        // new AWN().warning('Unable to set primary address, Please try again', {durations: {success: 0}})
        toast.warn('😔 Unable to set primary address, Please try again', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } 
      else if (reponse === true) {
        // alert("Address edited successfully")
        // new AWN().success('Address edited successfully', {durations: {success: 0}})

        toast.warn('🥳 Address edited successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // alert("Session Expired");
      // new AWN().warning('Session Expired', {durations: {success: 0}})
      toast.warn('😔 Session Expired', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate("/");
    }
  }
  
  if (isLoading) {
    return <div className="spinner-border  isLoading"></div>;
  }
  return (
    <div>
      <HomeHeader highlight="profile" />
      <div className="ProfileDiv">
        <div className="containerprofilediv px-3">
          <div className="row ps-5">
            <div className=" pt-5 profiledetailsdiv col-lg-8 col-sm-12 ">
              <h3 className="pt-5 ">{itemListProfile.name}</h3>
              <span className="me-3">{itemListProfile.phone}</span>
              <span className="me-3">.</span>{" "}
              <span>{itemListProfile.email}</span>
            </div>
            <div className="profiledetailbutton pt-5 px-0 col-5 col-sm-2  mt-5 ">
              <button
                className="EditProfile py-2 px-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#EditProfilecanvas"
              >
                <b>Edit Profile</b>
              </button>
            </div>
            <div className="offcanvas offcanvas-end" id="EditProfilecanvas">
              <div className="offcanvas-header">
                <h4 className="offcanvas-title EditProfileHeading">
                  Edit Profile
                </h4>
                <button
                  type="button"
                  className="btn-close "
                  data-bs-dismiss="offcanvas"
                ></button>
              </div>
              <div className="offcanvas-body">
                <input
                  name="name"
                  className="EditProfileinputbox mb-3 ps-2 mt-5"
                  onChange={HandleEdit}
                  value={editProfile.name}
                  placeholder="Name"
                />
                <input
                  name="phone"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleEdit}
                  value={editProfile.phone}
                  placeholder="Phone"
                />
                <br />
                <button
                  className="btn EditProfilecanvasclosebtn"
                  type="button"
                  onClick={() => SaveEdit()}
                  data-bs-dismiss="offcanvas"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="profiledetailbutton pt-5 px-0 col-6 col-sm-2  mt-5 pb-5">
              <button
                className="EditProfile   py-2 px-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#Addresscanvas"
                disabled={buttonDisabled}
              >
                <b>Add Address</b>
              </button>
            </div>
            <div className="offcanvas offcanvas-end" id="Addresscanvas">
              <div className="offcanvas-header">
                <h4 className="offcanvas-title EditProfileHeading">
                  Add Address
                </h4>
                <button
                  type="button"
                  className="btn-close "
                  data-bs-dismiss="offcanvas"
                ></button>
              </div>
              <div className="offcanvas-body">
                <input
                  name="flatno"
                  className="EditProfileinputbox mb-3 ps-2 mt-2"
                  onChange={HandleAddAdress}
                  value={addAddress.flatno}
                  placeholder="Flat No"
                />
                <input
                  name="street"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.street}
                  placeholder="Street"
                />
                <input
                  name="area"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.area}
                  placeholder="Area"
                />
                <input
                  name="city"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.city}
                  placeholder="City"
                />
                <input
                  name="state"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.state}
                  placeholder="State"
                />
                <input
                  name="country"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.country}
                  placeholder="Country"
                />
                <input
                  name="pincode"
                  className="EditProfileinputbox mb-3 ps-2"
                  onChange={HandleAddAdress}
                  value={addAddress.pincode}
                  placeholder="Pincode"
                />
                <br />
                <button
                  className="btn EditProfilecanvasclosebtn"
                  type="button"
                  onClick={() => AddAddress()}
                >
                  Add Adress
                </button>
              </div>
            </div>
          </div>
          <div className="Profilebuttondiv ps-5">
            <button
              className={` ${
                buttonClick === 1
                  ? "bg-light Profilebuttonclicked"
                  : "Profilebutton"
              }`}
              onClick={() => {
                setbuttonClick(1);
              }}
            >
              Address
            </button>
            <button
              className={` ${
                buttonClick === 2
                  ? "bg-light Profilebuttonclicked"
                  : "Profilebutton"
              }`}
              onClick={() => {
                Orders();
              }}
            >
              Orders
            </button>
            <button
              className={` ${
                buttonClick === 3
                  ? "bg-light Profilebuttonclicked"
                  : "Profilebutton"
              }`}
              onClick={() => Logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" id="EditAddresscanvas">
        <div className="offcanvas-header">
          <h4 className="offcanvas-title EditProfileHeading">Edit Address</h4>
          <button
            type="button"
            className="btn-close "
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <input
            name="flatno"
            className="EditProfileinputbox mb-3 ps-2 mt-2"
            onChange={handleAddressEditData}
            value={editAddress.flatno}
            placeholder="Flat No"
          />
          <input
            name="street"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.street}
            placeholder="Street"
          />
          <input
            name="area"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.area}
            placeholder="Area"
          />
          <input
            name="city"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.city}
            placeholder="City"
          />
          <input
            name="state"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.state}
            placeholder="State"
          />
          <input
            name="country"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.country}
            placeholder="Country"
          />
          <input
            name="pincode"
            className="EditProfileinputbox mb-3 ps-2"
            onChange={handleAddressEditData}
            value={editAddress.pincode}
            placeholder="Pincode"
          />
          <br />
          <button
            className="btn EditProfilecanvasclosebtn"
            type="button"
            data-bs-dismiss="offcanvas"
            onClick={()=>EditAddres(editAddress)}
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className=" ProfilesecondDiv px-5">
        {buttonClick === 1 &&
          (itemListProfile.address[0] ? (
            <div className="row pt-3">
              {itemListProfile.address.map((data) => {
                return (
                  <AddressCard
                    flatno={data.flatno}
                    street={data.street}
                    area={data.area}
                    city={data.city}
                    state={data.state}
                    country={data.country}
                    pincode={data.pincode}
                    isPrimary={data.isPrimary}
                    id={data._id}
                    key={data._id}
                    setEditAddressData={setEditAddressData}
                  />
                );
              })}
            </div>
          ) : (
            <div className="NoaddressDiv py-3">
              <img
                alt="image"
                className=""
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_252/NoSavedAddress_ttsdqs"
              />
              <h4 className="py-2 text-secondary">
                Can't find a door to knock
              </h4>
              <p className="text-secondary">
                You don't have an address to deliver.
              </p>
            </div>
          ))}
        {buttonClick === 2 && (
          <div className="row">
            {isLoadingOrders ? (
              <div className="isLoadingOrdes">
                <div className="spinner-border"></div>
              </div>
            ) : itemListOrders[0] ? (
              itemListOrders.map((data) => {
                return (
                  <OrderCard
                    orderDate={data.orderDate}
                    key={data.id}
                    OrderDetails={data.OrderDetails}
                  />
                );
              })
            ) : (
              <div className="orderEmpty">
                <img
                  alt="image"
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw"
                />
                <h6 className="text-secondary">No orders</h6>
                <p className="text-secondary">
                  You haven't placed any order yet.
                </p>
              </div>
            )}
          </div>
        )}
        {buttonClick === 3 && <div></div>}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
