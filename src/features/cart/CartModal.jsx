import React from "react";
import { ChevronLeftIcon, MinusIcon, PlusIcon, TicketIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import { addItemToCart, minusItemFromCart, removeItemFromCart, selectCartItems, selectTotalItemCart, selectTotalPoint, selectTotalPrice } from "./cartSlice";
import cartImg from "../../assets/img/cart-empty.png";

function CartModal({ onClose, onCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalPoint = useSelector(selectTotalPoint);
  const totalItem = useSelector(selectTotalItemCart);

  const handleAddItemCart = (product) => {
    const selectedProduct = { ...product, quantity: 1 };
    dispatch(addItemToCart(selectedProduct));
  };

  const handleMinusItemCart = (product) => {
    dispatch(minusItemFromCart(product));
  };

  const handleRemoveItemCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {
    if (selectTotalItemCart === 0) return;
    const phone = "6281212287528";
    const message = encodeURIComponent(
      `Halo Admin,\nSaya ingin melakukan checkout untuk pembelian barang-barang berikut:
      ${cartItems?.map((product, index) => `\n[${index + 1}] ${product?.title} (*Qty: ${product?.quantity}*)`)}\n\nTotal Barang: *${totalItem}*\nTotal Pembelian: *$${totalPrice.toFixed(
        2
      )} USD*\n\nMohon bantu konfirmasi ketersediaan stok dan informasi lanjut untuk proses pembayaran. Terima kasih! 
      `
    );
    const URL_CHECKOUT = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(URL_CHECKOUT, "_blank");
    onClose();
    onCheckout();
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative w-full">
        <div className="h-[42vh] overflow-y-auto px-5">
          <div className="h-full">
            <div className="absolute -top-[2.375rem] left-0 w-full">
              <h5 className="text-center font-bold">Cart</h5>
            </div>
            <div className="absolute -top-10 left-3 z-[101]">
              <button type="button" aria-label="Close Cart" className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 transition duration-100 ease-in-out hover:bg-gray-200" onClick={onClose}>
                <ChevronLeftIcon size={20} />
              </button>
            </div>
            {totalItem === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center pb-5">
                <img src={cartImg} alt="Empty Cart" className="block w-28" />
                <p className="mt-3 text-center text-sm font-semibold">Your cart is empty.</p>
                <p className="text-center text-sm text-gray-400">Add something to make me happy 😃</p>
                <button
                  type="button"
                  aria-label="Shop Now"
                  className="mt-3 block rounded-lg bg-lime-600 px-4 py-1.5 text-center text-sm font-bold leading-normal text-gray-100 transition duration-100 ease-in-out hover:bg-lime-500"
                  onClick={onClose}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {cartItems?.map((product) => (
                  <div className="flex items-center space-x-3 border-b border-dashed border-gray-200 py-4" key={product?.id}>
                    <div className="">
                      <figure className="h-20 w-14 overflow-hidden px-2">
                        <img src={product?.image} alt={product?.title} className="h-full w-full object-contain object-center" />
                      </figure>
                    </div>
                    <div className="w-full">
                      <h6 className="relative mb-px line-clamp-2 pr-8 text-sm font-bold text-gray-800 hover:line-clamp-none">
                        {product?.title}
                        <span className="absolute right-0 top-0 cursor-pointer" role="presentation" onClick={() => handleRemoveItemCart(product.id)}>
                          <XIcon size={20} className="stroke-gray-400 hover:stroke-red-500" />
                        </span>
                      </h6>
                      <p className="mb-1 text-xs capitalize text-gray-400">{product?.category}</p>
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold">${product?.totalPrice.toFixed(2)} USD</h6>
                        <div className="flex items-center overflow-hidden rounded-full border border-gray-300">
                          <button type="button" aria-label="Minus Item" className="px-3 py-2 leading-normal" onClick={() => handleMinusItemCart(product)}>
                            <MinusIcon size={14} strokeWidth={3} />
                          </button>
                          <p className="text-sm">{product?.quantity}</p>
                          <button type="button" aria-label="Add Item" className="px-3 py-1.5 leading-normal" onClick={() => handleAddItemCart(product)}>
                            <PlusIcon size={14} strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="sticky inset-x-0 bottom-0 md:static">
          <div className="border-t border-gray-200 px-5">
            <div className="relative mb-4 mt-4.5">
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 py-3 pl-12 pr-4 text-sm font-semibold uppercase text-gray-700 transition duration-100 ease-in-out focus:bg-gray-100 focus:outline-none"
                placeholder="Add coupon code"
                disabled={totalItem === 0}
              />
              <TicketIcon size={22} className="absolute left-4 top-3 stroke-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <p className="">Total</p>
              <p className="text-lg font-bold">${totalPrice.toFixed(2)} USD</p>
            </div>
            <p className="mb-3 flex items-center justify-between text-xs">
              <span className="text-gray-400">With this order you will earn {totalPoint} points</span>
              <span className="text-gray-400">VAT Included</span>
            </p>
            <button
              type="button"
              aria-label="Proceed to Checkout"
              className="w-full rounded-xl bg-gray-900 px-6 py-3.5 text-center text-sm font-bold leading-normal text-gray-100 transition duration-100 ease-in-out hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleCheckout}
              disabled={totalItem === 0}
            >
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartModal;
