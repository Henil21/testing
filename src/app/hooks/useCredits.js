// hooks/useCredits.js
import axios from "axios";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

export const useCredits = (dispatch) => {
    const { error, isLoading, Razorpay } = useRazorpay();

  const purchaseCredits = async (credits) => {
    try {
      // Step 1: Call the backend to create an order
      const response = await axios.post(
        "https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/credits/purchase-credits",
        { credits },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { order_id, amount, currency } = response.data;

      // Step 2: Configure Razorpay options
      const options = {
        // key: "rzp_live_USIQV4W7w1TcH2",
          key: "rzp_live_Qlv93k2tKoaW0f",
        amount: amount * 100,
        currency: "INR",
        name: "Axamine",
        description: "Purchase Credits",
        order_id,
       
        
        theme: {

          color: "#9202C5",
        },
      };

      // Open Razorpay payment modal
      const razorpay = new Razorpay(options);
    //   razorpay.on("payment.failed", (response) => {
    //     console.error("Payment failed:", response);
    //     alert("Payment failed. Please try again.");
    //   });

      razorpay.open();
    } catch (err) {
      console.error("Error initiating credit purchase:", err);
      alert("Failed to initiate purchase. Please try again later.");
    }
  };

  return { purchaseCredits };
};
