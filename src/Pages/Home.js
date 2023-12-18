import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import HomeHeader from "../Components/HomeHeader";
import "./Css/Home.css";
import Card from "../Components/Card";
import DishCard from "../Components/DishCard";
import { useNavigate } from "react-router-dom";
import { RestaurantCard } from "../Api/api";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [filteritemList, setfilteritemList] = useState([]);
  const [buttonClick, setbuttonClick] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await RestaurantCard();
        if (items === "login") {
          // alert("Session Expired");
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
        setItemList(items);
        const dishes = items.flatMap((data) => data.dishes);
        setfilteritemList(dishes);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function SetItem(data) {
    if (data === "Low") {
      filteritemList.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      setbuttonClick(3);
    } else if (data === "High") {
      filteritemList.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
      setbuttonClick(4);
    }
  }
  function HandleHomeButton(data) {
    if (data === "Relevance") {
      itemList.sort((a, b) => {
        if (a.res_name < b.res_name) {
          return -1;
        }
        if (a.res_name > b.res_name) {
          return 1;
        }
        return 0;
      });
      setbuttonClick(1);
    } else if (data === "Rating") {
      itemList.sort((a, b) => {
        if (a.ratting > b.ratting) {
          return -1;
        }
        if (a.ratting < b.ratting) {
          return 1;
        }
        return 0;
      });
      setbuttonClick(2);
    }
  }
  function AllDishNames(res_name) {
    const filteredDishesByRes = filteritemList.filter(
      (data) => data.res_name === res_name
    );
    const filteredDishes = filteredDishesByRes.flatMap(
      (data) => data.dish_name
    );
    return filteredDishes;
  }

  const handleFilteritemListChange = (newFilteritemList) => {
    setfilteritemList((prevFilteritemList) =>
      prevFilteritemList.map((data) => {
        if (
          newFilteritemList.res_id === data.res_id &&
          newFilteritemList.dish_id === data.dish_id
        ) {
          return {
            ...data,
            quantity: newFilteritemList.quantity,
          };
        } else {
          return data;
        }
      })
    );
  };

  if (isLoading) {
    return <div className="spinner-border  isLoading"></div>;
  }
  return (
    <div>
      <HomeHeader highlight="home" />
      <div className="HeaderRow1">
        <div className="row HeaderRow2 ">
          <div className=" col restaurantsCountDiv ">
            <span>1525 restaurants</span>
          </div>
          <div className="offset-2 col-6 btn-group  HomeHeader  Relevance ">
            <button className="btn ">
              <a
                className={`activeHomeBtn1 ${
                  buttonClick === 1 ? "activeHomeBtn" : ""
                }`}
                onClick={() => HandleHomeButton("Relevance")}
              >
                Relevance
              </a>
            </button>
            <button className="btn ">
              <a
                className={`activeHomeBtn1 ${
                  buttonClick === 2 ? "activeHomeBtn" : ""
                }`}
                onClick={() => HandleHomeButton("Rating")}
              >
                {" "}
                Rating ...
              </a>
            </button>
            <button className="btn ">
              <a
                className={`activeHomeBtn1 ${
                  buttonClick === 3 ? "activeHomeBtn" : ""
                }`}
                onClick={() => SetItem("Low")}
              >
                Cost:Low To High
              </a>
            </button>
            <button className="btn ">
              <a
                className={`activeHomeBtn1 ${
                  buttonClick === 4 ? "activeHomeBtn" : ""
                }`}
                onClick={() => SetItem("High")}
              >
                Cost:High To Low
              </a>
            </button>
            {/* <button className="btn "><a className={`activeHomeBtn1 ${buttonClick === 5 ? "activeHomeBtn" : ""}`}>Filters</a></button> */}
          </div>
        </div>
      </div>
      <div className="HeaderRowBorder"></div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          {buttonClick <= 2 &&
            itemList[0] &&
            itemList.map((item) => {
              return (
                <Card
                  res_name={item.res_name}
                  rating={item.ratting}
                  location={item.location}
                  image={item.image_url}
                  id={item._id}
                  key={item._id}
                  offer={item.offer}
                  coupon={item.coupon}
                  dishes={AllDishNames(item.res_name)}
                />
              );
            })}
        </div>
      </div>
      <div className="container">
        <div className="row">
          {buttonClick > 2 &&
            filteritemList[0] &&
            filteritemList.map((data) => {
              return (
                <DishCard
                  dishName={data.dish_name}
                  res_name={data.res_name}
                  category={data.category}
                  image={data.dish_image_url}
                  price={data.price}
                  rating={data.ratting}
                  res_id={data.res_id}
                  dish_id={data.dish_id}
                  quantity={data.quantity}
                  key={data.dish_id}
                  onFilteritemListChange={handleFilteritemListChange}
                />
              );
            })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Home;
