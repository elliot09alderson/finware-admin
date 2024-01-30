import React, { useEffect, useState } from "react";
import { useMultiStepForm } from "./Hook/useMultiStepForm";
import Register from "../FormComponents/Register";
import Onboarding from "../FormComponents/Onboarding";
import DocumentsUpload from "../FormComponents/DocumentsUpload";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  messageClear,
  seller_register,
} from "../../../../store/Reducers/authReducer";

// ********** <This is Main Form Element/>  Read the Hook Page for more info******************

const isEmptyObject = (obj) => {
  return Object.values(obj).every(
    (value) => value === null || value === undefined || value === ""
  );
};
const MultiStepForm = () => {
  const [state, setSatate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const location = useLocation();
  const [state2, setState] = useState({
    businessName: "",
    businessSubcategory: "",
    panNo: "",
    adhaarNo: "",
    businessAddress: "",
    businessPincode: "",
    gstNo: "",
    category: "",
  });
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const SUBMIT = (e) => {
    // if (isEmptyObject(state)) {
    //   setError(true);
    //   toast.error("Please Fill All Fields then move forward");
    // }
    e.preventDefault();
    if (isLastStep) {
      try {
        const formData = new FormData();
        formData.append("email", state.email);
        formData.append("name", state.name);
        formData.append("password", state.password);
        formData.append("businessName", state2.businessName);
        formData.append("subCategory", state2.businessSubcategory);
        formData.append("pan", state2.panNo);
        formData.append("adhaar", state2.adhaarNo);
        formData.append("businessAddress", state2.businessAddress);
        formData.append("pincode", state2.businessPincode);
        formData.append("gst", state2.gstNo);
        formData.append("category", state2.category);

        for (let i = 0; i < files.length; i++) {
          formData.append(`file${i + 1}`, files[i]);
        }
        dispatch(seller_register(formData));
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      next();
    }
  };

  useEffect(() => {
    if (successMessage && location.pathname.includes("/admin/addseller")) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/seller/dashboard");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    // **************** Import form pages here inside the array ... *************

    useMultiStepForm([
      <Register state={state} setSatate={setSatate} location={location} />,
      <Onboarding state2={state2} setState2={setState} />,
      <DocumentsUpload files={files} setFiles={setFiles} location={location} />,
    ]);

  return (
    <div className="flex min-h-screen  bg-[#161d31]  items-center justify-center">
      {/* On submit of form it will check for validations then  saves the state then increment the page */}
      <form
        className="sm:w-[300px] lg:w-[400px] "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="absolute top-2 right-2 text-white font-semibold text-lg">
          {currentStepIndex + 1}/{steps.length}
        </div>
        <div className=" flex flex-col gap-4 items-center justify-center  w-full">
          {step}
          <div
            className={`flex ${
              isFirstStep ? "justify-between" : "justify-end pr-8"
            }  bg-[#161d31] w-full`}
          >
            {isFirstStep && (
              <button
                type="button"
                className="px-4 py-2  w-32 text-sm font-semibold cursor-pointer text-white bg-slate-800 text-center rounded-md"
                onClick={() => back(currentStepIndex)}
              >
                Back
              </button>
            )}
            {/* On Click of form it will move back  decrement increment the page */}
            <button
              type="button"
              onClick={SUBMIT}
              disabled={error}
              className="px-4 py-2  w-32 text-sm font-semibold cursor-pointer text-white bg-slate-800 text-center rounded-md"
            >
              {isLastStep ? "Finsh" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
