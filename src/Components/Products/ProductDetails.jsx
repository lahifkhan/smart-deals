import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const modalRef = useRef();
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const [bidsData, setBidsData] = useState([]);
  //   console.log(user);
  //   console.log(product);

  //   load product bids

  useEffect(() => {
    fetch(`http://localhost:3000/bids/${product._id}`)
      .then((res) => res.json())
      .then((data) => setBidsData(data));
  }, [product._id]);

  //   handle open modal
  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  //   handle bid submit
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const amount = Number(e.target.bidAmount.value);
    console.log(name, email, amount);

    const newBid = {
      buyer_name: name,
      buyer_email: email,
      bid_price: amount,
      status: "pending",
      product: product._id,
      buyer_image: user?.photoURL,
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          modalRef.current.close();
          Swal.fire({
            title: "Bid Submitted",
            icon: "success",
            draggable: true,
          });

          const newBids = [...bidsData, newBid];
          const sortedBids = newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBidsData(sortedBids);
        }
        console.log(data);
      });
  };
  return (
    <div>
      <h1>Product details</h1>

      {/* product info */}
      <div>
        <div className="left">{/* image  */}</div>
        <div className="right">
          {/* details  */}

          <button onClick={handleOpenModal} className="btn btn-primary">
            I Want Buye This Product
          </button>
        </div>

        {/* modal for bids  */}
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

      {/* bids of this product */}

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL. No</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bidsData.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
