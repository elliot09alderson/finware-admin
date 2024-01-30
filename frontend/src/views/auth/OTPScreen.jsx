import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { admin_login, seller_login } from "../../store/Reducers/authReducer";
import { messageClear } from "../../store/Reducers/categoryReducer";

const OTPInput = ({ email, admin }) => {
  const [otp, setOtp] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleVerify = (e) => {
    e.preventDefault();
    const state = {
      otp,
      email,
    };
    if (!errorMessage) {
      if (admin === true) {
        console.log("otp sending to admin backend");
        dispatch(admin_login(state));
      } else {
        console.log("otp sending to seller backend");
        dispatch(seller_login(state));
      }
    }
  };

  return (
    <div className="bg-slate-600 rounded-lg">
      <p className="mb-4 text-lg font-semibold text-center pt-5">Enter OTP</p>
      <div className="flex justify-center">
        <input
          type="text"
          onChange={(e) => setOtp(+e.target.value)}
          className="text-black font-semibold text-lg rounded-lg"
        />
      </div>
      <div className="flex flex-row w-full">
        <button
          onClick={handleVerify}
          className="mx-auto mb-4 mt-10 border-2 border-solid border-slate-700  bg-slate-700  w-[200px] p-2 rounded-lg text-white font-semibold"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
