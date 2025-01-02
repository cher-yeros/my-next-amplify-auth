import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const login_user_validator = yupResolver(
  Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters long"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
);

export const sign_up_user_validator = yupResolver(
  Yup.object().shape({
    firstname: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters long"),
    lastname: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
);
