import React, { useState } from "react"


const OTPVerificationForm = ({sendData}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Function to handle changes in the input fields
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Prevent non-numeric input
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input field if current is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("otp",otpValue)
    console.log(typeof sendData)
    sendData(otpValue)
    setOtp(["", "", "", "", "", ""])
    
  };

  // Function to determine text color based on input value
  const getTextColor = (value) => {
    return value === "" ? "text-gray-500" : "text-black"; // Default to gray for empty and black for filled
  };

  return (
  <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-125 ">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          OTP Verification
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6 gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                required
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                className={`w-16 h-16 text-center text-2xl font-semibold border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none ${getTextColor(digit)}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white p-3 rounded-md text-lg font-semibold hover:bg-emerald-600 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
