export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-gray-200 px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent mb-8">
          About Recoil
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
          Recoil is a platform designed to connect innovators, founders, and dreamers.
          Our mission is to empower startups with the visibility and community they need
          to grow and thrive in the digital age.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            We believe that innovation should be accessible to everyone. Whether you’re building
            your first product or scaling globally, Recoil gives you the tools, visibility, and
            support to succeed. Our team is passionate about bridging creativity and technology.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
          <p className="text-gray-400 leading-relaxed">
            • A platform to share your startup journey. <br />
            • Tools to track your engagement and growth. <br />
            • A vibrant network of founders, investors, and enthusiasts. <br />
            • A hub of inspiration for the next generation of innovators.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We envision a world where every great idea has a chance to shine.
          At Recoil, we’re building more than a platform — we’re building a movement.
        </p>
      </div>
    </section>
  );
}
