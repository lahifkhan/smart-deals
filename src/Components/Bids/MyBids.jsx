import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const { user, loading } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    if (loading) {
      return;
    }
    fetch(`http://localhost:3000/bids?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      });
  }, [user, loading]);

  if (loading) {
    return <p>loading...</p>;
  }

  //   handle delete bid

  const handleBidDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              console.log(data);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div>
      <p className="text-4xl font-bold  text-center p-1">
        My Bids <span className="text-gradient-primary">{bids.length}</span>
      </p>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
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
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{bid.bid_price}</td>

                  <td>
                    {bid.status === "pending" ? (
                      <div className="badge badge-warning">{bid.status}</div>
                    ) : (
                      <div className="badge badge-success">{bid.status}</div>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleBidDelete(bid._id)}
                      className="btn btn-outline btn-error"
                    >
                      Delete
                    </button>
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

export default MyBids;
