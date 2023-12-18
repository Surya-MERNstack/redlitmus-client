import React from "react";
import "./Css/AddressCard.css";
import { useNavigate } from "react-router-dom";
import { DeleteAdressAPI, SetPrimaryAdressAPI } from "../Api/api";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function AddressCard(data) {
  const navigate = useNavigate();
  async function DeleteAdress(id) {
    try {
      const reponse = await DeleteAdressAPI(id);
      console.log(reponse);
      if (reponse === "login") {
        // alert("Session Expired");
        // new AWN().warning("Session Expired", {durations: {success: 0}})
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
      } else if (reponse === false) {
        // alert("Unable to delete address, Please try again");
        // new AWN().warning("Unable to delete address, Please try again", {durations: {success: 0}})
        toast.warn('😔 Unable to delete address, Please try again', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

      } else if (reponse === true) {
        // alert("Deleted successfully");
        // new AWN().success("Deleted successfully", {durations: {success: 0}})
        toast.warn('🫣 Deleted successfully', {
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
      // new AWN().warning("Session Expired", {durations: {success: 0}})
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

  async function SetPrimaryAdress(id) {
    try {
      const reponse = await SetPrimaryAdressAPI(id);
      if (reponse === "login") {
        // alert("Session Expired");
        // new AWN().warning("Session Expired", {durations: {success: 0}})
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
      } else if (reponse === false) {
        // alert("Unable to set primary address, Please try again");
        // new AWN().warning("Unable to set primary address, Please try again", {durations: {success: 0}})

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
      } else if (reponse === true) {
        // alert("Primary address changed successfully");
        // new AWN().success("Primary address changed successfully", {durations: {success: 0}})

        toast.success('🥳 Primary address changed successfully', {
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
      // new AWN().warning("Session Expired", {durations: {success: 0}})

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

  return (
    <div className="col-sm-5 col-12 AddressBox mb-3 ms-2">
      <div className="row pt-2 pb-3">
        <h4 className="col-4 col-sm-2 text-secondary">Address</h4>
        {data.isPrimary === true ? (
          <button
            className="col-sm-3 col-4 col-lg-4 btn btn-danger ms-5 AddressBoxbtn"
            disabled={data.isPrimary}
          >
            Primary
          </button>
        ) : (
          <button
            className="col-5 col-sm-6 col-lg-4 btn btn-danger ms-5 AddressBoxbtn"
            onClick={() => SetPrimaryAdress(data.id)}
          >
            Set as primary
          </button>
        )}
      </div>
      <p className="text-secondary">
        {data.flatno},{data.street},{data.area},{data.city},{data.state},
        {data.pincode},{data.country}
      </p>
      <button
        className="py-2 px-2 btn btn-link text-decoration-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#EditAddresscanvas"
        onClick={() => setTimeout(() => data.setEditAddressData(data), 1000)}
      >
        Edit
      </button>
      <button
        className="py-2 px-2 btn btn-link text-decoration-none"
        onClick={() => DeleteAdress(data.id)}
        disabled={data.isPrimary}
      >
        Delete
      </button>
      <ToastContainer/>
    </div>
  );
}

export default AddressCard;
