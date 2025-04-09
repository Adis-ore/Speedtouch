import { TbCurrencyNaira } from "react-icons/tb";
// const { createContext } = require("react");
import { createContext } from "react";
import { products } from "../assets/assets";
import { useState } from "react"; // Removed unused `useEffect`
import { useNavigate } from "react-router-dom";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const currency = <TbCurrencyNaira />;
  const delivery_fee = 1500;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  // ------------- TO  NAVIGATE--------------
  const navigate = useNavigate()

  //  ------------- ADD TO CART ----------------
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems); // Ensure compatibility if needed
    if (cartData[itemId]) {
      cartData[itemId]["amount"] += 1;
    } else {
      cartData[itemId] = { amount: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item].amount;
      console.log(typeof totalCount);
    }

    return totalCount;
  };

  //  --------------- TO DELETE AND UPDATE THE CART-----------------
  const updateQuantitiy = async (itemId, amount) => {
    let cartData = structuredClone(cartItems); // Ensure compatibility if needed
    if (amount === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId]["amount"] = Number(amount);
    }
    setCartItems(cartData);
  };

  //  --------------TO GET TO AMOUNT-----------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product && cartItems[itemId].amount > 0) {
        totalAmount += product.price * cartItems[itemId].amount;
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    getCartAmount, // Removed undefined `totalAmount`
    updateQuantitiy,
    delivery_fee,
    addToCart,
    setCartItems,
    cartItems,
    getCartCount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate
  };

  return (
    <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
