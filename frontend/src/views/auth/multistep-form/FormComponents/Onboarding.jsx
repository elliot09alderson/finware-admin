import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageClear } from "../../../../store/Reducers/authReducer";
import toast from "react-hot-toast";

// Add Product
const Onboarding = ({ state2, setState2 }) => {
  const dispatch = useDispatch();
  const [cateShow, setCateShow] = useState(false);
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const categoryOption = [
    {
      id: 1,
      name: "Partnership",
    },
    {
      id: 2,
      name: "Sole proprietorship",
    },
    {
      id: 3,
      name: "Corporation",
    },
    {
      id: 4,
      name: "Limited liability company",
    },
    {
      id: 5,
      name: "company",
    },
    {
      id: 6,
      name: "Large businesses",
    },
    {
      id: 7,
      name: "Limited partnership",
    },
    {
      id: 8,
      name: "Manufacturing",
    },
    {
      id: 9,
      name: "Merchandising business",
    },
    {
      id: 10,
      name: "Social enterprise",
    },
    {
      id: 11,
      name: "Limited company",
    },
    {
      id: 12,
      name: "Holding company",
    },
    {
      id: 13,
      name: "Limited by shares",
    },
  ];

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    setState2({
      ...state2,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" bg-[#161d31]  flex items-center justify-center ">
      <div className=" p-4 bg-[#283046] w-full rounded-lg">
        <div className="flex justify-between items-center ">
          <h1 className="text-[#d0d2d6] text-2xl mb-2 font-semibold">
            Seller Onboarding
          </h1>
        </div>
        <div>
          <form className="">
            <div className="flex flex-col  md:flex-row gap-4 w-full justify-center items-center text-[#d0d2d6] mt-5">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="businessName">Business Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.businessName}
                  type="text"
                  placeholder="Business name"
                  name="businessName"
                  id="businessName"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="panNo">PAN Number</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.panNo}
                  type="text"
                  placeholder="PAN no"
                  name="panNo"
                  id="panNo"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-5">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Business Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.category}
                  name="category"
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="pt-4"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {categoryOption.map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          state2.category === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setState2((prevState) => ({
                            ...prevState,
                            category: c.name,
                          }));
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="businessSubcategory">
                  Business Subcategory
                </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.businessSubcategory}
                  type="text"
                  placeholder="business subcategory"
                  name="businessSubcategory"
                  id="businessSubcategory"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-5">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="adhaarNo">Aadhaar Number</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.adhaarNo}
                  type="number"
                  placeholder="Adhaar No"
                  name="adhaarNo"
                  id="adhaarNo"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="businessAddress">Business Address</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.businessAddress}
                  type="text"
                  placeholder="Business address"
                  name="businessAddress"
                  id="businessAddress"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-5">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="businessPincode">Business Pincode</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.businessPincode}
                  type="number"
                  placeholder="Business Pincode"
                  name="businessPincode"
                  id="businessPincode"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="gstNo">GST No ( optional )</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state2.gstNo}
                  type="text"
                  placeholder="GST No"
                  name="gstNo"
                  id="gstNo"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
