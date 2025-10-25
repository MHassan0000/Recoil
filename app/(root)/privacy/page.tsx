export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-gray-200 px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent mb-10 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          At Recoil, your privacy is our top priority. This policy outlines how we collect, use, and safeguard your information.
        </p>

        <div className="space-y-8 text-gray-400">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>
              We collect personal details such as your name, email, and profile data when you register or interact with our platform.
              Additionally, we may gather analytics and usage data to improve your experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">2. How We Use Your Data</h2>
            <p>
              Your data helps us personalize your experience, maintain platform security, and deliver relevant features.
              We never sell or share your personal information without consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">3. Cookies & Analytics</h2>
            <p>
              We use cookies to enhance functionality and gather anonymous analytics to understand how users engage with Recoil.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">4. Data Protection</h2>
            <p>
              We use industry-standard encryption and secure servers to protect your data. You can contact us anytime to request account or data deletion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">5. Contact Us</h2>
            <p>
              For privacy concerns or data requests, please email us at{" "}
              <span className="text-green-400">privacy@recoil.com</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
