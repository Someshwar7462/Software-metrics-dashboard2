import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSendCode = () => {
    alert("OTP sent to email (Demo: 123456)");
    setStep(2);
  };

  const handleVerify = () => {
    if (code === "123456") {
      setStep(3);
    } else {
      alert("Invalid code");
    }
  };

  const handleReset = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.password = newPass;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSendCode}>Send Code</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="Enter OTP" onChange={(e) => setCode(e.target.value)} />
          <button onClick={handleVerify}>Verify</button>
        </>
      )}

      {step === 3 && (
        <>
          <input type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
          <button onClick={handleReset}>Reset Password</button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
