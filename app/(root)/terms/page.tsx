export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-gray-200 px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-10 text-center">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-400">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By using Recoil, you agree to comply with these Terms & Conditions.
              If you do not agree, you should discontinue using the platform immediately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">2. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account information
              and for all activities under your account. You agree not to misuse or exploit any part of our service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">3. Intellectual Property</h2>
            <p>
              All content, trademarks, and code within Recoil are the intellectual property of their respective owners.
              Unauthorized reproduction, distribution, or modification is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">4. Limitation of Liability</h2>
            <p>
              Recoil is provided “as is.” We do not guarantee uninterrupted service or absolute accuracy of information.
              Recoil is not liable for damages arising from the use of our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">5. Modifications</h2>
            <p>
              Recoil reserves the right to modify these terms at any time. Updated terms will be posted on this page with the revision date.
            </p>
          </div>
        </div>

        <p className="text-sm text-center text-gray-500 mt-10">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
