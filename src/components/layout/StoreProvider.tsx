"use client";
import { store } from "@/redux/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import MyApolloProvider from "./MyApolloProvider";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const storeRef = useRef<AppStore>();
  //   if (!storeRef.current) {
  //     // Create the store instance the first time this renders
  //     storeRef.current = makeStore();
  //   }

  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Provider store={store}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <MyApolloProvider>{children}</MyApolloProvider>
      </Provider>
    </Suspense>
  );
}
