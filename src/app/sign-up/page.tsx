"use client";

import { SIGN_UP_USER } from "@/graphql/auth/auth";
import { loginFinished } from "@/redux/slices/authSlice";
import { sign_up_user_validator } from "@/utils/validator/auth";
import { useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  //  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [signUpUser, { loading, error }] = useMutation(SIGN_UP_USER);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: sign_up_user_validator,
  });

  const onSubmit = async (values: any) => {
    console.log({ values });

    try {
      const { data } = await signUpUser({
        variables: { input: { ...values, role: "Student" } },
      });

      console.log({ data });

      // if (data?.loginUser?.user?.role === "Student") {
      //  dispatch(loginFinished(data.loginUser));

      //   console.log(data);
      redirect("/login");
      //   // navigate("/dashboard");
      // }

      reset();
    } catch (error) {
      console.log(error);
      // toast.error(error.message, {
      //   autoClose: 500,
      // });
    }
  };

  console.log(errors);

  return (
    <section
      className="container forms d-flex justify-content-center"
      style={{
        padding: 15,
        background: "none",
      }}
    >
      <div className="form login">
        <div className="form-content">
          <header>Signup</header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            style={{ marginTop: "1.5rem" }}
          >
            <div className="field input-field">
              <input
                {...register("firstname")}
                placeholder="First Name"
                className="input"
                autoComplete="off"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("lastname")}
                placeholder="Last Name"
                className="input"
                autoComplete="off"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("email")}
                placeholder="Email"
                className="input"
                autoComplete="off"
                type="email"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number"
                className="input"
                autoComplete="off"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("password")}
                type="password"
                placeholder="Create password"
                className="password"
                autoComplete="off"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("confirm_password")}
                type="password"
                placeholder="Confirm password"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="field button-field">
              <button>{loading ? "Loading..." : "Sign Up"}</button>
            </div>

            {error?.message && (
              <Typography
                color="error"
                sx={{ mt: 2, textAlign: "center", color: "error" }}
              >
                {error?.message}!
              </Typography>
            )}
          </form>
          <div className="form-link">
            <span>
              Already have an account?{" "}
              <Link href="/login" className="link login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
        {/* <div className="line"></div> */}
        {/* <div className="media-options">
          <a href="#" className="field facebook">
            <i className="bx bi-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
          </a>
        </div> */}
        {/* <div className="media-options">
          <a href="#" className="field google">
            <img
              src="https://static.cdnlogo.com/logos/g/38/google-icon.svg"
              alt=""
              className="google-img"
            />
            <span>Login with Google</span>
          </a>
        </div> */}
      </div>
    </section>
  );
}
