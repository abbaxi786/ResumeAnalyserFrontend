import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Resume Analyzer
            </h2>

            <p className="mt-3 text-blue-200 leading-relaxed">
              Analyze your resume, discover your strengths, and find
              opportunities that match your skills and experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-blue-200 hover:text-white transition-colors"
              >
                About
              </Link>

              <Link
                href="/login"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Resume Tools
            </h3>

            <p className="text-blue-200 leading-relaxed">
              Improve your resume with AI-powered analysis and
              job matching.
            </p>

            <Link
              href="/pages/post_resume"
              className="inline-block mt-4 px-5 py-2 rounded-lg bg-white text-blue-900 font-semibold hover:bg-blue-100 transition-colors"
            >
              Analyze Resume
            </Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-blue-300">
            © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm">
            <Link
              href="/privacy"
              className="text-blue-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-blue-300 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;