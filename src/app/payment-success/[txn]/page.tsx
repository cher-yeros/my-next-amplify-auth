import React from "react";
import "@/assets/css/status.css";
import "@/assets/css/status.css";
import { useRouter } from "next/router";

// export async function generateStaticParams() {
//   // Simulate fetching transaction IDs or define them manually for static export
//   const transactions = ["TXN123", "TXN456", "TXN789"]; // Example static transaction IDs

//   return transactions.map((txn) => ({ txn }));
// }

export default function page({ params }: { params: any }) {
  // const router = useRouter();
  // const { txn } = router.query; // Get the dynamic route parameter `txn`

  // if (!txn) {
  //   return <div>Loading...</div>; // Return a loading state while waiting for the parameter
  // }

  return (
    <div style={{ height: "100%" }}>
      {" "}
      <section id="featured-services" className="featured-services">
        <div className="container">
          <div className="section-title">
            <span>Payment Successfull</span>
            <h2>Payment Successfull</h2>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="icon-box align-items-center justify-content-center">
                <div className="icon">
                  <i className="bi bi-check"></i>
                </div>
                <h4 className="title">
                  <a href="">Successfully Paid !</a>
                </h4>
                <p className="description">
                  {/* Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi sint occaecati cupiditate non provident */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
