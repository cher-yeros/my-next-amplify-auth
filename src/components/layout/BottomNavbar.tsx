"use client";

import { loginFinished } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  ArrowDropDown,
  ArrowDropUp,
  Logout,
  MoreHoriz,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
export default function BottomNavbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { currentUser }: any = useAppSelector((state) => state.auth);

  // const { data: categories, loading } = useQuery(GET_COURSE_CATEGORIES);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(
      loginFinished({
        user: {},
        token: null,
        avatar: null,
      })
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const isHomepage = pathname === "/";

  return (
    <div
      className={
        "container-fluid nav-bar px-0 px-lg-4 py-lg-0 " +
        (isHomepage ? "" : "navbar-not-homepage")
      }
      style={{
        position: "absolute",
        top: "1rem",
        zIndex: 1000000,
        // background: isHomepage ? "none" : "#fff",
      }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand p-0">
            <Image
              src={
                "/assets/img/logo/lela_logo_full_color.png"

                // !isHomepage
                //   ? "/assets/img/logo/lela_logo_white.png"
                //   : "/assets/img/logo/lela_logo_full_color.png"
              }
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button> */}

          <IconButton
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            className="navbar-toggler"
          >
            <MoreHoriz />
          </IconButton>

          <Box
            className="collapse navbar-collapse"
            id="navbarCollapse"
            sx={{
              pl: 3,
              "& .navbar-nav": {
                background: "#F8F8F8",
                // background: !isHomepage ? "#f8f9fa" : "none",
                px: 2,
                "& .nav-link": {
                  color: isHomepage ? "#f0f0f0" : "rgb(0 0 0 / 80%)",
                  position: "relative",
                  "&:hover": {
                    color: isHomepage ? "white" : "inherit",
                    // "&::after": {
                    //   content: `""`,
                    //   position: "absolute",
                    //   width: "25px",
                    //   height: "2px",

                    //   left: "50%",
                    //   transform: "translateX(-50%)",
                    //   top: "45px",
                    //   border: isHomepage
                    //     ? "2px solid #FFFFFF"
                    //     : "2px solid #0d6efd",
                    //   borderRadius: 1,
                    // },
                  },
                },
                "& .nav-item.active": {
                  color: isHomepage ? "#0d6efd!important" : "#0d6efd",
                  fontWeight: "bold",
                  position: "relative",
                  // "&::after": {
                  //   content: `""`,
                  //   position: "absolute",
                  //   width: "25px",
                  //   height: "2px",

                  //   left: "50%",
                  //   transform: "translateX(-50%)",
                  //   top: "45px",
                  //   border: isHomepage
                  //     ? "2px solid #FFFFFF"
                  //     : "2px solid #0d6efd",
                  //   borderRadius: 1,
                  // },
                },
              },
            }}
          >
            <div className="navbar-nav mx-0 mx-lg-auto">
              <Link
                href="/"
                className={`nav-item nav-link ${pathname === "/" && "active"}`}
              >
                Home
              </Link>

              {/* <MouseHoverPopover value={"Courses"} /> */}

              {/* <li className="nav-item dropdown dropdown-hover position-static">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                  <span className="dropdown-toggle">Courses</span>
                </a>

                <div
                  className="dropdown-menu w-50 mt-0"
                  aria-labelledby="navbarDropdown"
                  style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <div className="container">
                    <div className="row my-4">
                      {courseCategories1.map((c, i) => (
                        <div key={i} className="col-md-6 col-lg-6 mb-3 mb-lg-0">
                          <div className="list-group list-group-flush">
                            {c.map((category) => (
                              <Link
                                key={category.id}
                                href="/courses"
                                className="list-group-item "
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li> */}

              <Link
                href="/courses"
                className={`nav-item nav-link ${
                  pathname === "/courses" && "active"
                }`}
              >
                Courses
              </Link>
              {/* <Link
                  href="#aboutl"
                  className={`nav-item nav-link ${
                    pathname === "/aboutl" && "active"
                  }`}
                >
                  About
                </Link> */}
              {/* 
              <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                  <span className="dropdown-toggle">Courses</span>
                </a>
                <div className="dropdown-menu">
                  {loading ? (
                    <a href="#" className="dropdown-item">
                      Loading...
                    </a>
                  ) : (
                    categories?.allCourseCategorys?.map((category: any) => (
                      <Link
                        key={category?.id}
                        href="/courses"
                        className="dropdown-item"
                      >
                        {category?.name}
                      </Link>
                    ))
                  )}
                </div>
              </div> */}

              {currentUser?.id && (
                <Link
                  href="/my-courses"
                  className={`nav-item nav-link ${
                    pathname === "/my-courses" && "active"
                  }`}
                >
                  MyCourses
                </Link>
              )}
              {/* {currentUser?.id && (
                <Link
                  href="/wish-list"
                  className={`nav-item nav-link ${
                    pathname === "/wish-list" && "active"
                  }`}
                >
                  WishList
                </Link>
              )} */}
              <div className="nav-btn   ">
                <TextField
                  fullWidth
                  size="small"
                  sx={{
                    background: "white",
                    width: "25rem",
                    display: "none",

                    "& .MuiOutlinedInput-input": {
                      // padding: "6px 10px",
                      // fontSize:  ".85rem",
                      // borderTopRightRadius: "0!important",
                    },
                    "& .MuiOutlinedInput-root": {
                      // border: 3,
                      borderColor: "#1976d2",
                      // ...customStyle,
                      // padding: 0,
                      "&:hover": {
                        borderColor: "#1976d2",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      border: "none!important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      // border: "none!important",
                      border: 2,
                      borderColor: "#1976d2",
                    },
                    "& .MuiFormLabel-root:not(.MuiInputLabel-shrink)": {
                      top: "-4px",
                    },
                  }}
                />
                <button
                  className="btn-search btn btn-primary btn-md-square rounded-square  flex-shrink-0 mx-2 "
                  // data-bs-toggle="modal"
                  // data-bs-target="#searchModal"
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  {/* <i
                    className="fas fa-search"
                    style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
                  ></i> */}
                  <Search />
                </button>
                {/* {currentUser?.id && (
                  <Link
                    href={"/carts"}
                    className="btn-search btn btn-primary btn-md-square rounded-circle flex-shrink-0"
                    // data-bs-toggle="modal"
                    // data-bs-target="#searchModal"
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    
                    <MoneyOffCsredRounded />
                  </Link>
                )} */}
              </div>
            </div>
          </Box>

          {!currentUser?.id &&
            (!isHomepage ? (
              <Link
                href="/login"
                className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
                style={{
                  // background: "#FFFFFF",
                  fontWeight: 500,

                  textAlign: "center",
                  // color: "#0D6EFC",
                }}
              >
                Sign In
              </Link>
            ))}
          <div className="d-none d-xl-flex flex-shrink-0 ps-4">
            {currentUser?.id && (
              <>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  onClick={handleClick}
                  sx={{
                    cursor: "pointer",
                    color: isHomepage ? "white" : "black",
                  }}
                >
                  <Avatar
                    sx={{
                      background: "#d3d3d3",
                      color: "#0e3b7e",
                      fontWeight: "bold",
                    }}
                  >
                    {currentUser?.firstname?.at(0)}
                  </Avatar>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: isHomepage ? "white" : "black",
                    }}
                  >
                    {currentUser?.firstname}{" "}
                    {currentUser?.lastname?.at(0) + "."}
                  </Typography>

                  {open ? (
                    <ArrowDropUp color="inherit" />
                  ) : (
                    <ArrowDropDown color="inherit" />
                  )}
                </Stack>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>My Profile</MenuItem>

                  <Divider />
                  <MenuItem onClick={handleClose}>
                    {/* <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon> */}
                    My Learning
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {/* <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon> */}
                    My Cart
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {/* <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon> */}
                    Wish List
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {/* <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon> */}
                    Purchase History
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* <a
              href="#"
              className="btn btn-light btn-lg-square rounded-circle position-relative wow tada"
              data-wow-delay=".9s"
              style={{
                height: "3.2rem",
                width: "3.2rem",
              }}
            >
              <i
                className="fa fa-phone-alt fa-2x"
                style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
              ></i>
              <div
                className="position-absolute"
                style={{ top: "7px", right: "12px" }}
              >
                <span>
                  <i
                    className="fa fa-comment-dots text-secondary"
                    style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
                  ></i>
                </span>
              </div>
            </a> */}
            <div className="d-flex flex-column ms-3">
              {/* <span>Call to Our Hub</span>
              <a href="tel:+ 0123 456 7890">
                <span className="text-dark">Free: + 251 456 789 01</span>
              </a> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

const courseCategories1 = [
  [
    {
      id: 1,
      picture: "image_url_1",
      name: "Accounting & Finance",
      attribute: "category",
    },
    {
      id: 2,
      picture: "image_url_2",
      name: "Arts & Crafts",
      attribute: "category",
    },
    {
      id: 3,
      picture: "image_url_3",
      name: "Beauty & Makeup",
      attribute: "category",
    },
    {
      id: 4,
      picture: "image_url_4",
      name: "Business & Marketing",
      attribute: "category",
    },
    {
      id: 5,
      picture: "image_url_5",
      name: "Creatives & Design",
      attribute: "category",
    },
    {
      id: 6,
      picture: "image_url_6",
      name: "Food & Beverage",
      attribute: "category",
    },
    {
      id: 7,
      picture: "image_url_7",
      name: "Health & Fitness",
      attribute: "category",
    },
  ],
  [
    {
      id: 8,
      picture: "image_url_8",
      name: "IT & Development",
      attribute: "category",
    },
    {
      id: 9,
      picture: "image_url_9",
      name: "Language & Literature",
      attribute: "category",
    },
    {
      id: 10,
      picture: "image_url_10",
      name: "Music & Theatre",
      attribute: "category",
    },
    {
      id: 11,
      picture: "image_url_11",
      name: "Office Productivity",
      attribute: "category",
    },
    {
      id: 12,
      picture: "image_url_12",
      name: "Personal Development",
      attribute: "category",
    },
    {
      id: 13,
      picture: "image_url_13",
      name: "Photography & Videography",
      attribute: "category",
    },
  ],
];
