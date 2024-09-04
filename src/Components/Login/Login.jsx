import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";




export default function Login() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  const [ApiError, setApiError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function handelLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);

        if (res.data.message == "success") {
          localStorage.setItem("UserToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response.data.message);
      });
  }
  let validationSchema = yup.object().shape({
    email: yup.string().email("Not valid Email").required(),
    password: yup
      .string()
      .min(
        6,
        "Must be more than 6 char and contains at least one Capital letter"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",

      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });
  return (
    <>
      {ApiError ? (
        <div className="div w-1/2 mx-auto py-3 mt-3 rounded-lg text-center text-white bg-red-600">
          {ApiError}
        </div>
      ) : null}

      <div>
        <h1 className="text-3xl font-bold text-gray-500 py-3">Login Now </h1>
      </div>
      <div className="formBody py-7">
        <form className="max-w-md mx-auto " onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className=" peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email ? (
              <span className="text-red-600">{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className=" peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <span className="text-red-600">{formik.errors.password}</span>
            ) : null}
          </div>

          <div className="flex gap-3 pt-3 items-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {IsLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <span>Login</span>
              )}
            </button>
            <Link to="/Register" className="text-blue-700 underline">
              You don't Have an account ? Register Now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
