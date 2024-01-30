import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import loginImg from "../../assets/login-removebg-preview.png";

import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  admin_send_mail,
  messageClear,
} from "../../store/Reducers/authReducer";

import OTPInput from "./OTPScreen";

// **** Admin
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [showOTP, setShowOTP] = useState(undefined);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      setShowOTP((prev) => true);

      toast.success(successMessage);
      dispatch(messageClear());
      // navigate("/");
    }
  }, [errorMessage, successMessage]);

  const [state, setSatate] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    // dispatch(admin_send_mail(state));
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className=" pr-0 lg:pr-0 max-h-screen overflow-hidden">
      <div className="flex justify-between">
        <div className="flex justify-center items-center min-w-[50%]">
          <form
            onSubmit={submit}
            action="#"
            method="post"
            className="lg:max-w-[400px] sm:max-w-[300px] max-w-[80%]"
          >
            <div className="md:mt-2 mt-4">
              {/* <img src={merchantLogo} className="w-32 mx-auto py-3" /> */}
              <p className="text-center"></p>
              {/* <h3 className="text-center">Log In</h3> */}
              <p className=" text-center font-medium text-slate-800 my-4 mb-6 mt-2">
                Login to your Merchant Account
              </p>
            </div>
            <div className="form-group first my-6 flex flex-col gap-5">
              <div>
                <input
                  type="email"
                  value={state.email}
                  onChange={inputHandle}
                  className=" w-full px-2 py-2 ring-1 max-w-[400px] rounded-md focus:outline-none "
                  placeholder="email"
                  name="email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={state.password}
                  onChange={inputHandle}
                  className="w-full px-2 py-2 ring-1 max-w-[400px]  lg:min-w-[400px]  rounded-md focus:outline-none "
                  placeholder="password"
                  name="password"
                  required
                />
              </div>
            </div>

            <div className=" mb-4 flex  items-centers justify-center ">
              {showOTP && (
                <div className="w-[300px] h-[230px]">
                  <OTPInput email={state.email} admin={true} />
                </div>
              )}
              <button
                disabled={loader ? true : false}
                type="submit"
                className={
                  "bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                }
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  `${showOTP ? "Veriy OTP" : "Login"}`
                )}
              </button>
            </div>
            <p className="mb-4 text-xs text-center text-[#552288] font-medium">
              <span className=" sm:inline  ">New to Finware? </span>
              <span
                onClick={() => navigate("/merchants/signup")}
                className=" cursor-pointer underline transition-all hover:opacity-70"
              >
                Sign up
              </span>
            </p>

            <p className="text-xs sm:text-md sm:text-center sm:opacity-80 text-left font-medium opacity-50 text-gray-500 ">
              Protected by reCAPTCHA. <br /> Google{" "}
              <a href="#">Privacy Policy </a>&<a href="#"> Terms of Service</a>
            </p>
          </form>
        </div>
        <div className=" min-h-[100vh] hidden flex-col bg-[#440a64] min-w-[50%] p-16 sm:flex items-center justify-center">
          <img src={loginImg} className="w-10/12 " />
        </div>
      </div>
    </div>

    // -------------------------------------------------------------------------------------
    // <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
    //   <div className="w-[350px] text-[#d0d2d6] p-2">
    //     <div className="bg-[#283046] p-4 rounded-md">
    //       <div className="h-[70px] flex gap-4 justify-center items-center">
    //         <div className="h-[50px]">
    //           <img
    //             className="w-full cursor-pointer hover:scale-125 hover:rotate-90 duration-500 transition-all h-full shadow-sm"
    //             src={logo}
    //             alt="image"
    //           />
    //         </div>
    //         <div className="text-center my-4 hover:tracking-widest duration-200 text-3xl">
    //           Admin Login
    //         </div>
    //       </div>
    //       <form onSubmit={submit} className="mt-4">
    //         <div className="flex flex-col w-full gap-1 mb-3">
    //           <label htmlFor="email">Email</label>
    //           <input
    //             onChange={inputHandle}
    //             value={state.email}
    //             className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
    //             type="text"
    //             name="email"
    //             placeholder="email"
    //             id="email"
    //             required
    //           />
    //         </div>
    //         <div className="flex flex-col w-full gap-1 mb-5">
    //           <label htmlFor="password">Password</label>
    //           <input
    //             onChange={inputHandle}
    //             value={state.password}
    //             className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
    //             type="password"
    //             name="password"
    //             placeholder="password"
    //             id="password"
    //             required
    //           />
    //         </div>
    //         {showOTP && (
    //           <div className="w-[300px] h-[230px]">
    //             <OTPInput email={state.email} admin={true} />
    //           </div>
    //         )}
    //         <button
    //           disabled={loader ? true : false}
    //           className={
    //             "bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
    //           }
    //         >
    //           {loader ? (
    //             <PropagateLoader color="#fff" cssOverride={overrideStyle} />
    //           ) : (
    //             `${showOTP ? "Veriy OTP" : "Login"}`
    //           )}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminLogin;
