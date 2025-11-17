"use client";

import { useState } from "react";

export default function ColdEmailClient() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    website: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const res = await fetch("/api/cold-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);
    
    if (data.success) {
      setStatus("✓ Email sent successfully!");
      setForm({ fullName: "", email: "", company: "", website: "" });
    } else {
      setStatus("✗ Failed to send email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00bc7c] to-[#00a06d] mb-4 shadow-lg shadow-[#00bc7c]/30">
            <span className="text-3xl font-bold text-white">Mo</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Better Call Mo
          </h1>
          <p className="text-gray-400 text-lg">
            Send personalized emails to potential clients
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                name="fullName"
                placeholder="e.g. Ahmed Hassan"
                className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 outline-none text-white placeholder-gray-500 focus:border-[#00bc7c] focus:ring-2 focus:ring-[#00bc7c]/20 transition-all"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Client Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="ahmed@company.com"
                className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 outline-none text-white placeholder-gray-500 focus:border-[#00bc7c] focus:ring-2 focus:ring-[#00bc7c]/20 transition-all"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  name="company"
                  placeholder="e.g. Tech Solutions"
                  className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 outline-none text-white placeholder-gray-500 focus:border-[#00bc7c] focus:ring-2 focus:ring-[#00bc7c]/20 transition-all"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  name="website"
                  placeholder="https://example.com"
                  className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 outline-none text-white placeholder-gray-500 focus:border-[#00bc7c] focus:ring-2 focus:ring-[#00bc7c]/20 transition-all"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00bc7c] to-[#00a06d] hover:from-[#00a06d] hover:to-[#008c5e] text-white p-4 rounded-xl font-semibold shadow-lg shadow-[#00bc7c]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </>
              )}
            </button>
          </form>

          {status && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
              status.includes('✓') 
                ? 'bg-[#00bc7c]/20 text-[#00bc7c] border border-[#00bc7c]/30' 
                : status.includes('✗')
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-gray-700/50 text-gray-300 border border-gray-600'
            }`}>
              {status}
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Emails are sent from your configured Gmail account</p>
        </div>
      </div>
    </div>
  );
}