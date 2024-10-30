import React, { Suspense, } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.scss";
// src/index.tsx or src/App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';


const DefaultLayout = React.lazy(
  () => import("./DefaultLayout/DefaultLayout")
);

const loading = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </div>
);

const App = () => {
  const router = createHashRouter([
    {
      path: "*",
      element: <DefaultLayout />,
    },
  ]);

  return (
    <>
      <Suspense fallback={loading}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
