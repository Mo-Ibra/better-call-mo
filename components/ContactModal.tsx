import React, { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    platform: "",
    niche: "",
    website: "",
    adSpend: 10000,
    ctr: 2,
    conversionRate: 3,
    fullName: "",
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 6;

  // Reset quiz when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setShowSuccess(false);
      setFormData({
        platform: "",
        niche: "",
        website: "",
        adSpend: 10000,
        ctr: 2,
        conversionRate: 3,
        fullName: "",
        email: "",
      });
    }
  }, [isOpen]);

  // Handle auto-advance for radio buttons
  useEffect(() => {
    if (currentStep === 1 && formData.platform) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.platform, currentStep]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.platform || !formData.niche || !formData.website) {
      alert("Please fill in all required fields.");
      console.log("Missing required fields:", formData);
      return;
    }

    try {
      console.log("Quiz submission:", formData);

      // const res = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (res.ok) {
      //   setShowSuccess(true);
      // } else {
      //   console.error("Failed to send email");
      // }

      setShowSuccess(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  if (!isOpen) return null;

  return (
    <div className="quiz-modal active" onClick={handleModalClick}>
      <div className="quiz-container">
        <button className="quiz-close" onClick={closeModal}>
          ×
        </button>

        <div className="quiz-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="quiz-header">
          <h3 className="quiz-title">Let&apos;s Create Your Growth Strategy</h3>
          <p className="quiz-subtitle">
            Answer a few questions to help us understand your needs
          </p>
        </div>

        <div className="quiz-body">
          {!showSuccess ? (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Platform */}
              <div className={`quiz-step ${currentStep === 1 ? "active" : ""}`}>
                <h4 className="quiz-question">
                  What platform are you currently advertising on?
                </h4>
                <div className="quiz-radio-group">
                  {[
                    {
                      value: "Facebook/Instagram",
                      label: "Facebook / Instagram",
                    },
                    { value: "TikTok", label: "TikTok" },
                    { value: "Google Ads", label: "Google Ads" },
                    {
                      value: "Multiple Platforms",
                      label: "Multiple Platforms",
                    },
                  ].map((option, index) => (
                    <React.Fragment key={option.value}>
                      <input
                        type="radio"
                        name="platform"
                        value={option.value}
                        id={`platform${index + 1}`}
                        className="quiz-radio-input"
                        checked={formData.platform === option.value}
                        onChange={(e) =>
                          handleInputChange("platform", e.target.value)
                        }
                        required
                      />
                      <label
                        htmlFor={`platform${index + 1}`}
                        className="quiz-radio-label"
                      >
                        <span className="quiz-radio-text">{option.label}</span>
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step 2: Niche */}
              <div className={`quiz-step ${currentStep === 2 ? "active" : ""}`}>
                <h4 className="quiz-question">What niche are you in?</h4>
                <div className="quiz-input-group">
                  <input
                    type="text"
                    className="quiz-input"
                    placeholder="Enter your niche (e.g., Beauty, Fashion, Tech, etc.)"
                    value={formData.niche}
                    onChange={(e) => handleInputChange("niche", e.target.value)}
                  />
                </div>
                <div className="quiz-nav">
                  <button
                    type="button"
                    className="quiz-btn quiz-btn-continue"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 3: Website */}
              <div className={`quiz-step ${currentStep === 3 ? "active" : ""}`}>
                <h4 className="quiz-question">What is your website domain?</h4>
                <div className="quiz-input-group">
                  <input
                    type="text"
                    className="quiz-input"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                  />
                </div>
                <div className="quiz-nav">
                  <button
                    type="button"
                    className="quiz-btn quiz-btn-continue"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 4: Ad Spend */}
              <div className={`quiz-step ${currentStep === 4 ? "active" : ""}`}>
                <h4 className="quiz-question">
                  What&apos;s your monthly ad spend?
                </h4>
                <div className="quiz-input-group">
                  <input
                    type="range"
                    className="quiz-range-input"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={formData.adSpend}
                    onChange={(e) =>
                      handleInputChange("adSpend", parseInt(e.target.value))
                    }
                    required
                  />
                  <span className="range-value">
                    ${formData.adSpend.toLocaleString()}
                  </span>
                </div>
                <div className="quiz-nav">
                  <button
                    type="button"
                    className="quiz-btn quiz-btn-continue"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 5: ROI Calculator */}
              <div className={`quiz-step ${currentStep === 5 ? "active" : ""}`}>
                <h4 className="quiz-question">Ad ROI Calculator</h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "2rem",
                  }}
                >
                  What performance metrics are you seeing?
                </p>

                <div className="range-group">
                  <label className="range-label">
                    Click-Through Rate (CTR)
                  </label>
                  <input
                    type="range"
                    className="quiz-range-input"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={formData.ctr}
                    onChange={(e) =>
                      handleInputChange("ctr", parseFloat(e.target.value))
                    }
                    required
                  />
                  <span className="range-value">{formData.ctr}%</span>
                </div>

                <div className="range-group">
                  <label className="range-label">Conversion Rate</label>
                  <input
                    type="range"
                    className="quiz-range-input"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={formData.conversionRate}
                    onChange={(e) =>
                      handleInputChange(
                        "conversionRate",
                        parseFloat(e.target.value)
                      )
                    }
                    required
                  />
                  <span className="range-value">
                    {formData.conversionRate}%
                  </span>
                </div>

                <div className="quiz-nav">
                  <button
                    type="button"
                    className="quiz-btn quiz-btn-continue"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 6: Contact Info */}
              <div className={`quiz-step ${currentStep === 6 ? "active" : ""}`}>
                <h4 className="quiz-question">
                  Last step! Where should we send your growth strategy?
                </h4>
                <div className="quiz-input-group">
                  <input
                    type="text"
                    className="quiz-input"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="quiz-input-group">
                  <input
                    type="email"
                    className="quiz-input"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="quiz-nav">
                  <button type="submit" className="quiz-btn quiz-btn-submit">
                    Get My Growth Strategy
                  </button>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="step-indicator">
                {[...Array(totalSteps)].map((_, index) => (
                  <span
                    key={index}
                    className={`step-dot ${
                      index < currentStep ? "active" : ""
                    }`}
                  ></span>
                ))}
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="quiz-success active">
              <div className="success-icon">
                <div className="success-checkmark"></div>
              </div>
              <h3 className="success-title">Thank You! 🎉</h3>
              <p className="success-text">
                Your personalized growth strategy is on its way to your inbox.
              </p>
              <p className="success-note">
                Please check your spam folder if you don&apos;t see it within 5
                minutes.
              </p>
              <button className="quiz-btn quiz-btn-submit" onClick={closeModal}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
