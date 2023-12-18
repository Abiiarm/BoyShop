import React from "react";
import { BookHeartIcon, ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectTotalItemCart } from "../features/cart/cartSlice";
import { selectTotalWishlistItems } from "../features/wishlist/wishlistSlice";

function Header({ onOpenCart, onOpenWishlist }) {
  const totalCartItem = useSelector(selectTotalItemCart);
  const totalWishlistItem = useSelector(selectTotalWishlistItems);

  const handleToggleWishlist = () => {
    onOpenWishlist();
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-gray-800">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <a href="/" className="flex items-center text-gray-100 transition-all duration-100 ease-in-out hover:scale-105">
            <figure className="mr-2 block">
              <img src="https://vitejs.dev/logo.svg" alt="Vite Logo" className="h-7 mobile:h-8" />
            </figure>
            <span className="hidden text-xl font-bold text-gray-100 mobile:block">BoyShop</span>
          </a>
          <h5 className="text-lg font-bold text-gray-100 mobile:hidden">BoyShop</h5>
          <div className="flex items-center space-x-4.5 mobile:space-x-6">
            <button className="relative" type="button" title="wishlist" onClick={handleToggleWishlist}>
              <BookHeartIcon strokeWidth={2.5} className="w-5 stroke-gray-100" />
              {totalWishlistItem > 0 ? <div className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-gray-800 bg-red-500" /> : ""}
            </button>
            <button className="relative" type="button" title="Cart" onClick={onOpenCart}>
              <ShoppingCartIcon strokeWidth={2.5} className="w-5 stroke-gray-100" />
              {totalCartItem > 0 ? (
                <div className="absolute -right-2.5 -top-2.5 flex h-5.5 w-5.5 items-center justify-center rounded-full border-[3px] border-gray-800 bg-red-500">
                  <span className="text-2xs font-medium text-white">{totalCartItem}</span>{" "}
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onOpenCart: PropTypes.func.isRequired,
  onOpenWishlist: PropTypes.func.isRequired,
};

export default Header;
