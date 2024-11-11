// import React, { useEffect, useState } from "react";

// export const useRestaurantMenu = (restaurantId) => {
//   const [resData, setResData] = useState();

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = async () => {
//     const res = await fetch(
//       `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9698196&lng=77.7499721&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`
//     );
//     const data = await res.json();
//     console.log(data);
//     setResData(data.data);
//   };
//   return resData;
// };
