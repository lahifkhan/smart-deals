import React, { useRef } from "react";

const ProductDetails = () => {
  const modalRef = useRef();

  //   handle open modal
  const handleOpenModal = () => {
    modalRef.current.showModal();
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

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button>
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form action="">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
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
