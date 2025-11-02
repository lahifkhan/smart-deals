import React, { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const ProductDetails = () => {
  const modalRef = useRef();
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  //   console.log(user);
  //   console.log(product);

  //   handle open modal
  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  //   handle bid submit

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const amount = e.target.bidAmount.value;
    console.log(name, email, amount);

    const newBid = {
      buyer_name: name,
      buyer_email: email,
      bid_price: amount,
      status: "pending",
      product: product._id,
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>Product details</h1>

      <div className="left">{/* image  */}</div>
      <div className="right">
        {/* details  */}

        <button onClick={handleOpenModal} className="btn btn-primary">
          I Want Buye This Product
        </button>
      </div>

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleBidSubmit}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                name="name"
                defaultValue={user?.displayName}
                readOnly
              />
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                defaultValue={user?.email}
                readOnly
                name="email"
              />
              {/* amount */}
              <label className="label">Bid Amount</label>
              <input
                type="text"
                className="input"
                placeholder="Amount"
                name="bidAmount"
              />

              <button className="btn btn-primary mt-4">Submit Bid</button>
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
