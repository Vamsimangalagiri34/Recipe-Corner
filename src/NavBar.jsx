import React, { Fragment, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { use } from "react";

function NavBar() {
  const titles = useRef();
  const seachitem=useRef();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [meal, setMeal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    titles.current.textContent = "Zomato Recipe Corner";

    const getData = () => {
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((response) => {
          setData(response.categories);
        })
        .catch((er) => console.log(er));
    };

    getData();
  }, []);

  useEffect(() => {
    const tempOptions = [];
    tempOptions.push(
      <option value="null" key="default">
        {"select recipe"}
      </option>
    );
    data.forEach((ele, index) => {
      tempOptions.push(
        <option
          value={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ele.strCategory}`}
          key={index}
        >
          {ele.strCategory}
        </option>
      );
    });

    setOptions(tempOptions);
  }, [data]);

  const selectCat = (e) => {
    const selectedMeal = e.target.value;
    setMeal(selectedMeal);
    console.log(meal)
    navigate("/recipes", { state: { mealUrl: selectedMeal } }); // Navigate with state
  };

  const searchKaro = () => {
    const searchValue = seachitem.current.value.trim(); // Get the trimmed input value
    if (!searchValue) {
      // Check if the input is empty
      alert("Please enter a search term.");
      return;
    }
  
    // Fetch the search results based on the user input
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          // Navigate to the recipes page if meals are found
          navigate("/recipes", { state: { mealUrl: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}` } });
        } else {
          // Display an alert if no meals are found
          alert("No meals found. Please try a different search term.");
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        alert("An error occurred while searching. Please try again later.");
      });
  };
  

  return (
    <Fragment>
      <div className="NavBar">
        <div className="heading">
          <div className="titles" ref={titles}></div>
          <div className="subheading">Make it Have it Feel it 🍽️</div>
          <div className="searchbar">
            <select name="menu" id="categories" onChange={selectCat}> 
              {options.length > 0 ? options : <option disabled>Loading...</option>}
            </select>
            <input type="text" placeholder="search"  ref={seachitem}/>{" "}
            <button onClick={searchKaro}>search</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NavBar;