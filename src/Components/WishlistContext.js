import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { urlPath } from "../END_POINTS";
import MyContext from "./Context";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [
    search,
    setSearch,
    data,
    setData,
    productID,
    setProductID,
    userName,
    setUserName,
    login,
    setLogin,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    category,
    setCategory,
  ] = useContext(MyContext);
  const [wishlistStatus, setWishlistStatus] = useState(() => {
    const storedWishlist = localStorage.getItem(`wishlist_${phoneNumber}`);
    return storedWishlist ? JSON.parse(storedWishlist) : {};
  });
  
  
  const updateWishlistStatus = (productId, status) => {
    setWishlistStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: status,
    }));
  };


  useEffect(() => {
    localStorage.setItem(`wishlist_${phoneNumber}`, JSON.stringify(wishlistStatus));
  }, [wishlistStatus]);

  const clearLocalStorageOnLogout = () => {
    localStorage.removeItem(`wishlist_${phoneNumber}`);
    setWishlistStatus({});
  };

  
  const loadUserSpecificData = (userPhoneNumber) => {
    localStorage.removeItem(`wishlist_${userPhoneNumber}`);
  
    const userWishlistData = fetchUserWishlistData(userPhoneNumber);
    console.log("fetch",userWishlistData);
    setWishlistStatus(userWishlistData);
    localStorage.setItem(`wishlist_${userPhoneNumber}`, JSON.stringify(userWishlistData));
  };

  const fetchUserWishlistData = (userPhoneNumber) => {
    
    const fetchUserWishlistData = async (userPhoneNumber) => {
      try {
        let url = `${urlPath}/wishlist/list/${userPhoneNumber}`;
        
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        });
    
        if (response.status === 202) {
          const wishlistData = response.data.reduce((status, item) => {
            status[item.products.productID] = true;
            return status;
          }, {});
         
          return wishlistData;
        } else {
          console.error("Unexpected response status:", response.status);
          return {};
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
        return {};
      }
    };
    
    return {};
  };

  
  return (
    <WishlistContext.Provider value={{ wishlistStatus, updateWishlistStatus , clearLocalStorageOnLogout }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
