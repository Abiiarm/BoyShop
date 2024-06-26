import React, { useState } from "react";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import ProductList from "./features/producList/ProductList";
import CartModal from "./features/cart/CartModal";
import Filter from "./components/Filter";
import WishlistModal from "./features/wishlist/WishlistModal";

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
  const [isOpenModalWishlist, setIsOpenModalWishlist] = useState(false);
  const [dateTimeCheckout, setDateTimeCheckout] = useState(null);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };
  const handleCloseModalCart = () => {
    setIsOpenModalCart(false);
  };
  const handleOpenModalProduct = () => {
    setIsOpenModalProduct(true);
  };
  const handleCloseModalProduct = () => {
    setIsOpenModalProduct(false);
  };
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true);
  };
  const handleCloseModalFilter = () => {
    setIsOpenModalFilter(false);
  };
  const handleOpenCheckout = () => {
    setIsCheckout(true);
    setDateTimeCheckout(new Date());
  };
  const handleCloseCheckout = () => {
    setIsCheckout(false);
  };
  const handleOpenModalWishlist = () => {
    setIsOpenModalWishlist(true);
  };
  const handleCloseModalWishlist = () => {
    setIsOpenModalWishlist(false);
  };

  const bodyApp = document.querySelector("body");
  if (isOpenModalCart || isOpenModalProduct || isCheckout || isOpenModalFilter || isOpenModalWishlist) {
    bodyApp.classList.add("overflow-hidden");
  } else {
    bodyApp.classList.remove("overflow-hidden");
  }

  return (
    <div className={isOpenModalCart || isOpenModalProduct || isCheckout || isOpenModalFilter || isOpenModalWishlist ? "overflow-hidden" : ""}>
      <Header onOpenCart={handleOpenModalCart} onOpenWishlist={handleOpenModalWishlist} />
      <main className="container mx-auto mt-24 min-h-[calc(100vh-189px)] max-w-7xl px-5 sm:px-6">
        <h1 className="mb-10 hidden pt-6 text-center text-2xl font-bold mobile:block">Shop Now</h1>
        <ProductList onOpen={handleOpenModalProduct} onClose={handleCloseModalProduct} onOpenFilter={handleOpenModalFilter} />
      </main>
      <footer className="mt-10 bg-gray-900">
        <div className="container mx-auto max-w-7xl px-5 py-4 sm:px-6">
          <p className="text-center text-sm text-slate-200">
            Copyright <span className="text-center text-sm text-slate-200">@</span> by{" "}
            <a href="https://github.com/Abiiarm" className="text-lime-500 transition duration-100 ease-in-out hover:text-lime-600" target="_blank" rel="noopener noreferrer" title="Abiboy">
              Abiboy
            </a>
          </p>
        </div>
      </footer>
      {isOpenModalCart ? <CartModal onClose={handleCloseModalCart} onCheckout={handleOpenCheckout} /> : null}
      {isCheckout ? <Checkout closeCheckout={handleCloseCheckout} datetime={dateTimeCheckout} /> : null}
      {isOpenModalFilter ? <Filter onClose={handleCloseModalFilter} /> : null}
      {isOpenModalWishlist ? <WishlistModal onClose={handleCloseModalWishlist} onOpenCart={handleOpenModalCart} /> : null}
    </div>
  );
}

export default App;
