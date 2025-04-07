import { TbCurrencyNaira } from "react-icons/tb";
// const { createContext } = require("react");
import { createContext } from "react";
import { products } from "../assets/assets";
import { useState, useEffect } from "react";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const currency = <TbCurrencyNaira />;
  const delivery_fee = 1500;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    // console.log(cartData);/
    if (cartData[itemId]) {
      cartData[itemId]["amount"] += 1;
      // console.log(cartData);
    } else {
      cartData[itemId] = { amount: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item].amount;
    }

    return totalCount;
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    addToCart,
    setCartItems,
    cartItems,
    getCartCount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return (
    <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
