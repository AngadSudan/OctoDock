import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Server,
  Zap,
  Plane,
} from "lucide-react";
import { useSearchParams } from "react-router";

const pricingData = {
  PRO: 29,
  ENTERPRISE: 99,
};

function CheckOut() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    email: "",
  });
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const normalizedPlan = plan?.toUpperCase();
  const selectedPlan = pricingData[normalizedPlan] ? normalizedPlan : "PRO";
  const [price, setPrice] = useState(pricingData[plan.toUpperCase()]);

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{2})/, "$1/")
        .substr(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 3);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-pulse mb-4">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-400 mb-4 font-mono tracking-wider">
            PAYMENT AUTHORIZED
          </h1>
          <p className="text-gray-400 font-mono text-lg mb-8">
            Transaction completed successfully
          </p>
          <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl p-6 inline-block">
            <div className="text-red-400/70 font-mono text-sm mb-2">
              TRANSACTION ID
            </div>
            <div className="text-red-400 font-mono text-xl font-bold">
              TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Corner status indicators */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-3 py-2">
          <div className="text-red-400/70 font-mono text-xs">SEC.LEVEL</div>
          <div className="text-red-400 font-mono text-sm font-bold flex items-center gap-2">
            <Shield size={14} />
            256-BIT
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-3 py-2">
          <div className="text-red-400/70 font-mono text-xs">STATUS</div>
          <div className="text-red-400 font-mono text-sm font-bold">SECURE</div>
        </div>
      </div>

      {/* Main checkout container */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Order summary */}
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <Server size={24} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-red-400 font-mono tracking-wider">
                  OCTODOCK
                </h1>
              </div>
              <p className="text-gray-400 font-mono text-sm tracking-wide">
                SECURE PAYMENT GATEWAY
              </p>
            </div>

            {/* Order summary card */}
            <div className="bg-black/70 backdrop-blur-md border border-red-400/30 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={20} className="text-red-400" />
                <h2 className="text-xl font-bold text-red-400 font-mono">
                  ORDER SUMMARY
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-red-400/20">
                  <span className="text-gray-400 font-mono text-sm">
                    Professional Plan
                  </span>
                  <span className="text-red-400 font-mono font-bold">
                    ${price}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-400/20">
                  <span className="text-gray-400 font-mono text-sm">
                    Processing Fee
                  </span>
                  <span className="text-red-400 font-mono font-bold">$0.0</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-400/20">
                  <span className="text-gray-400 font-mono text-sm">
                    Tax (10%)
                  </span>
                  <span className="text-red-400 font-mono font-bold">$0.0</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-red-400/10 rounded-lg px-4 mt-4">
                  <span className="text-red-400 font-mono text-lg font-bold">
                    TOTAL
                  </span>
                  <span className="text-red-400 font-mono text-2xl font-bold">
                    ${price}
                  </span>
                </div>
              </div>
            </div>

            {/* Security features */}
            <div className="bg-black/70 backdrop-blur-md border border-red-400/30 rounded-xl p-6">
              <h3 className="text-red-400 font-mono text-sm font-bold mb-4 flex items-center gap-2">
                <Lock size={16} />
                SECURITY FEATURES
              </h3>
              <div className="space-y-3">
                {[
                  "256-bit SSL encryption",
                  "PCI DSS compliant processing",
                  "Real-time fraud detection",
                  "Zero data retention policy",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    <span className="text-gray-400 font-mono text-xs">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Payment form */}
          <div className="bg-black/70 backdrop-blur-md border border-red-400/30 rounded-xl p-8 hover:border-red-400/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard size={24} className="text-red-400" />
              <h2 className="text-xl font-bold text-red-400 font-mono">
                PAYMENT DETAILS
              </h2>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-red-400/70 font-mono text-xs mb-2 tracking-wide">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                  placeholder="user@octodock.com"
                  required
                />
              </div>

              {/* Card number */}
              <div>
                <label className="block text-red-400/70 font-mono text-xs mb-2 tracking-wide">
                  CARD NUMBER
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  className="w-full bg-black/50 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              {/* Cardholder name */}
              <div>
                <label className="block text-red-400/70 font-mono text-xs mb-2 tracking-wide">
                  CARDHOLDER NAME
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                  placeholder="JOHN DOE"
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-red-400/70 font-mono text-xs mb-2 tracking-wide">
                    EXPIRY DATE
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-red-400/70 font-mono text-xs mb-2 tracking-wide">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              {/* Security notice */}
              <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-400 font-mono text-xs leading-relaxed">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white font-mono font-bold py-4 rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-400/25"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    COMPLETE SECURE PAYMENT
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 font-mono text-xs mt-4">
                Protected by OctoDock Security™
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="text-red-400/30 font-mono text-xs tracking-[0.3em] animate-pulse">
          ▼ SECURE PAYMENT PROCESSING ▼
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
