"use client";

import { LOGIN_USER } from "@/graphql/auth/auth";
import { loginFinished } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { login_user_validator } from "@/utils/validator/auth";
import { useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loginAdmin, { loading, error }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: login_user_validator,
  });

  const onSubmit = async (values: any) => {
    try {
      const { data } = await loginAdmin({ variables: { input: values } });

      if (data?.loginUser?.user?.role === "Student") {
        if (data?.loginUser?.user?.is_corporate_user) {
          const prod = `https://corporate.lelahub.org?user_id=${data?.loginUser?.user?.id}&corporate_id=${data?.loginUser?.user?.corporate_id}`;
          // const prod = `https://master.d1ls91w5xf0dcs.amplifyapp.com?user_id=${data?.loginUser?.user?.id}&corporate_id=${data?.loginUser?.user?.corporate_id}`;
          const dev = `http://localhost:3002?user_id=${data?.loginUser?.user?.id}&corporate_id=${data?.loginUser?.user?.corporate_id}`;

          window.open(
            process.env.NODE_ENV === "production" ? prod : dev,
            "_newtab"
          );
        } else {
          dispatch(loginFinished(data.loginUser));
          console.log(data);
          router.push("/my-courses");
        }

        reset();
      }

      reset();
    } catch (error) {
      console.log(error);
      // toast.error(error.message, {
      //   autoClose: 500,
      // });
    }
  };

  return (
    <section
      className="container forms d-flex justify-content-center"
      style={{ background: "none" }}
    >
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="field input-field">
              {/* <Controller control={control}/> */}
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone"
                className="input"
              />
            </div>
            <div className="field input-field">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field button-field">
              <button type={loading ? "button" : "submit"}>
                {loading ? "Loading..." : "Login"}
              </button>
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
              Do not have an account?{" "}
              <Link href="sign-up" className="link signup-link">
                Signup
              </Link>
            </span>
          </div>
        </div>
        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field google">
            <img
              src="https://static.cdnlogo.com/logos/g/38/google-icon.svg"
              alt=""
              className="google-img"
            />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
      {/* <!-- Signup Form --> */}
    </section>
  );
}
