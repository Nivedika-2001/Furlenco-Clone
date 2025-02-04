import React, { useState } from "react";
import MyContext from "./Context";
const ContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [productID, setProductID] = useState();
  const [userName, setUserName] = useState("User");
  const [login, setLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(8378863594);
  const [role, setRole] = useState("USER");
  const [productCategory, setProductCategory] = useState("Living Room");
  const [discount, setDiscount] = useState(0);
  return (
    <MyContext.Provider
      value={[
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
        productCategory,
        setProductCategory,
        discount,
        setDiscount,
      ]}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
