import React, { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    projectType: "",
    niche: "",
    website: "",
    hasWebsite: "no",
    services: [] as string[],
    budget: 1000,
    fullName: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 6;

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setShowSuccess(false);
      setFormData({
        projectType: "",
        niche: "",
        website: "",
        hasWebsite: "no",
        services: [],
        budget: 1000,
        fullName: "",
        email: "",
        message: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev: any) => {
      const services = prev.services || [];
      return services.includes(service)
        ? { ...prev, services: services.filter((s: string) => s !== service) }
        : { ...prev, services: [...services, service] };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission:", formData);
    setShowSuccess(true);
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
    <div 
      className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-xl flex items-center justify-center z-50 p-4 overflow-y-auto transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={handleModalClick}
    >
      <div className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto relative shadow-2xl border border-emerald-400 border-opacity-20 transition-transform duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-12'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-10 h-10 bg-card/50 bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:rotate-90 z-10"
        >
          ×
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-card/50 bg-opacity-10 overflow-hidden rounded-t-3xl">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 shadow-lg shadow-emerald-400/50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className="text-center pt-16 pb-8 px-8">
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
            Let's Talk About Your Project 🚀
          </h3>
          <p className="text-muted-foreground text-opacity-60 text-base">
            Answer a few quick questions so I can understand your needs
          </p>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          {!showSuccess ? (
            <div>
              
              {/* Step 1: Project Type */}
              <div className={`${currentStep === 1 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  What type of project do you need?
                </h4>
                <div className="space-y-4 mb-8">
                  {["Landing Page", "Business Website", "E-commerce", "Portfolio", "Other"].map(
                    (type, index) => (
                      <label key={index} className="flex items-center p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-emerald-400 hover:border-opacity-50 relative overflow-hidden group">
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          checked={formData.projectType === type}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          required
                          className="absolute opacity-0"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-300 ${
                          formData.projectType === type 
                            ? 'border-emerald-400 bg-emerald-400' 
                            : 'border-card/90 border-opacity-20'
                        }`}>
                          {formData.projectType === type && (
                            <div className="w-2 h-2 bg-gray-900 rounded-full m-auto mt-0.5"></div>
                          )}
                        </div>
                        <span className="text-white font-medium">{type}</span>
                        {formData.projectType === type && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                        )}
                      </label>
                    )
                  )}
                </div>
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5 uppercase tracking-wider min-w-48"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 2: Niche */}
              <div className={`${currentStep === 2 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  What industry or niche are you in?
                </h4>
                <div className="mb-8">
                  <input
                    type="text"
                    className="w-full p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl text-white font-bold placeholder-muted placeholder-opacity-40 transition-all duration-300 focus:outline-none focus:bg-opacity-8 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20"
                    placeholder="e.g., Restaurant, Education, Fashion, etc."
                    value={formData.niche}
                    onChange={(e) => handleInputChange("niche", e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5 uppercase tracking-wider min-w-48"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 3: Website */}
              <div className={`${currentStep === 3 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  Do you already have a website?
                </h4>
                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-emerald-400 hover:border-opacity-50 relative overflow-hidden">
                    <input
                      type="radio"
                      name="hasWebsite"
                      value="yes"
                      checked={formData.hasWebsite === "yes"}
                      onChange={(e) => handleInputChange("hasWebsite", e.target.value)}
                      className="absolute opacity-0"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-300 ${
                      formData.hasWebsite === "yes" 
                        ? 'border-emerald-400 bg-emerald-400' 
                        : 'border-card/90 border-opacity-20'
                    }`}>
                      {formData.hasWebsite === "yes" && (
                        <div className="w-2 h-2 bg-gray-900 rounded-full m-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-white font-medium">Yes</span>
                    {formData.hasWebsite === "yes" && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                    )}
                  </label>
                  
                  <label className="flex items-center p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-emerald-400 hover:border-opacity-50 relative overflow-hidden">
                    <input
                      type="radio"
                      name="hasWebsite"
                      value="no"
                      checked={formData.hasWebsite === "no"}
                      onChange={(e) => handleInputChange("hasWebsite", e.target.value)}
                      className="absolute opacity-0"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-300 ${
                      formData.hasWebsite === "no" 
                        ? 'border-emerald-400 bg-emerald-400' 
                        : 'border-card/90 border-opacity-20'
                    }`}>
                      {formData.hasWebsite === "no" && (
                        <div className="w-2 h-2 bg-gray-900 rounded-full m-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-white font-medium">No</span>
                    {formData.hasWebsite === "no" && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                    )}
                  </label>
                </div>
                
                {formData.hasWebsite === "yes" && (
                  <div className="mb-8">
                    <input
                      type="text"
                      className="w-full p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl text-white placeholder-muted font-bold placeholder-opacity-40 transition-all duration-300 focus:outline-none focus:bg-opacity-8 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5 uppercase tracking-wider min-w-48"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 4: Services */}
              <div className={`${currentStep === 4 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  What services do you need?
                </h4>
                <div className="space-y-4 mb-8">
                  {[
                    "UI/UX Design",
                    "Frontend Development",
                    "Backend Development",
                    "SEO Optimization",
                    "Website Maintenance",
                    "Other",
                  ].map((service, index) => (
                    <label key={index} className="flex items-center p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-emerald-400 hover:border-opacity-50 relative overflow-hidden">
                      <input
                        type="checkbox"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="absolute opacity-0"
                      />
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                        formData.services.includes(service)
                          ? 'border-emerald-400 bg-emerald-400'
                          : 'border-card/90 border-opacity-20'
                      }`}>
                        {formData.services.includes(service) && (
                          <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-white font-medium">{service}</span>
                      {formData.services.includes(service) && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                      )}
                    </label>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5 uppercase tracking-wider min-w-48"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 5: Budget */}
              <div className={`${currentStep === 5 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  What's your expected budget?
                </h4>
                <div className="mb-8">
                  <input
                    type="range"
                    className="w-full h-2 bg-card/50 bg-opacity-10 rounded-lg appearance-none cursor-pointer mb-4 slider"
                    min="500"
                    max="20000"
                    step="500"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((formData.budget - 500) / (20000 - 500)) * 100}%, rgba(55, 65, 81, 0.5) ${((formData.budget - 500) / (20000 - 500)) * 100}%, rgba(55, 65, 81, 0.5) 100%)`
                    }}
                  />
                  <div className="text-center">
                    <span className="inline-block text-white text-xl font-semibold px-4 py-2 bg-emerald-400 bg-opacity-20 rounded-lg border border-emerald-400 border-opacity-30">
                      ${formData.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30 hover:-translate-y-0.5 uppercase tracking-wider min-w-48"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 6: Contact Info */}
              <div className={`${currentStep === 6 ? 'block animate-fade-in' : 'hidden'}`}>
                <h4 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  Last step! How can I reach you?
                </h4>
                <div className="space-y-4 mb-8">
                  <input
                    type="text"
                    className="w-full p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl text-white placeholder-muted-foreground font-bold placeholder-opacity-40 transition-all duration-300 focus:outline-none focus:bg-opacity-8 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="w-full p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl text-white placeholder-muted-foreground font-bold placeholder-opacity-40 transition-all duration-300 focus:outline-none focus:bg-opacity-8 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full p-4 bg-card/50 bg-opacity-5 border border-card/90 border-opacity-10 rounded-xl text-white placeholder-muted-foreground placeholder-opacity-40 transition-all duration-300 focus:outline-none focus:bg-opacity-8 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20 min-h-32 resize-y"
                    placeholder="Any additional details about your project?"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={handleSubmit}
                    className="w-full max-w-xs px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/40 hover:-translate-y-0.5 uppercase tracking-wider"
                  >
                    Send Request
                  </button>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center space-x-2 mt-8 pb-4">
                {[...Array(totalSteps)].map((_, index) => (
                  <span
                    key={index}
                    className={`transition-all duration-300 rounded-full ${
                      index < currentStep
                        ? 'w-6 h-2 bg-emerald-400 shadow-sm shadow-emerald-400/50'
                        : 'w-2 h-2 bg-card/90 bg-opacity-20'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="text-center pb-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="w-full h-full rounded-full bg-emerald-400 flex items-center justify-center animate-bounce">
                  <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-black text-white mb-4">Thank You! 🎉</h3>
              <p className="text-white text-opacity-80 text-lg mb-8 leading-relaxed">
                I'll get back to you as soon as possible.
              </p>
              <button 
                onClick={closeModal}
                className="w-full max-w-xs px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/40 hover:-translate-y-0.5 uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`

      `}</style>
    </div>
  );
};

export default ContactModal;