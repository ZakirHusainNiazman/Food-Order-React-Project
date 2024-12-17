import React, { useContext } from "react";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import Input from "./ui/Input";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type':'application/json',
    },
}


function Checkout() {
  const { items,clearCart } = useContext(CartContext);
  const totalAmount = items.reduce(
    (total, currItem) => total + currItem.quantity * currItem.price,
    0
  );
    const { progress, hideCheckout } = useContext(UserProgressContext);
    const { data,error,isLoading:isSending,sendRequest,clearData } = useHttp('http://localhost:3000/orders',reqConfig)

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submitting...");
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
    
        sendRequest(JSON.stringify({
            order: {
                items: items,
                customer: customerData,
            },
        }));
    }

    function handleFinish() {
        hideCheckout();
        clearCart()
        clearData();
    }
    
    let actions =<><Button onClick={hideCheckout} type="button" textOnly>
            Close
          </Button>
        <Button>Submit Order</Button>
      </>
      
      if (isSending) {
          actions = <span>Sending order data ...</span>
    }
    
    if (data) {
        return (
          <Modal open={progress === "checkout"} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>
              We will get back to you with more details within the next few
              minuts.
            </p>
            <p className="actions">
              <Button onClick={handleFinish}>Ok</Button>
            </p>
          </Modal>
        );
    }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form onSubmit={handleSubmit} action="">
        <h2>Checkout</h2>
        <p>Total Amount:{totalAmount} </p>
        <Input label="Full Name" id="name" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street" id="street" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" />
          <Input label="City" id="city" />
              </div>
              {error && <Error title="faild to submit order" message={error} />}
        <p className="modal-action">
            {actions}
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
