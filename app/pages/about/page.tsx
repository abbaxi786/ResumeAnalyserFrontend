"use client";

import React from "react";
import {
  FiTarget,
  FiSearch,
  FiKey,
  FiBriefcase,
  FiBarChart2,
  FiTrendingUp,
  FiUpload,
  FiUserCheck,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import { FiZap } from "react-icons/fi";
function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-white/10">
              <FiFileText className="text-5xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            About Resume Analyzer
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            Understand how well your resume matches a job and discover
            what you can improve before applying.
          </p>

        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">

          <div className="flex items-center gap-4">

            <div className="p-3 rounded-xl bg-blue-100">
              <FiTarget className="text-3xl text-blue-900" />
            </div>

            <h2 className="text-3xl font-bold text-blue-900">
              What is Resume Analyzer?
            </h2>

          </div>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Resume Analyzer is an intelligent resume analysis platform
            designed to help job seekers understand how well their resumes
            match a specific job opportunity.
          </p>

          <p className="mt-4 text-gray-600 text-lg leading-8">
            Instead of manually comparing your resume with a job description,
            Resume Analyzer analyzes your resume against the required role,
            skills, experience, and keywords to provide meaningful insights
            and an overall score.
          </p>

        </div>

      </section>


       <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-blue-900">
              What We Analyze
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Resume Analyzer evaluates important factors that determine
              how closely your resume matches a job opportunity.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
                <FiTarget className="text-2xl text-blue-900" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Skills
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Identifies technical and professional skills that match
                the requirements of the target position.
              </p>

            </div>


            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100">
                <FiSearch className="text-2xl text-red-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Missing Skills
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Highlights important skills required by the job that are
                missing from your resume.
              </p>

            </div>


            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-100">
                <FiKey className="text-2xl text-yellow-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Keywords
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Analyzes relevant keywords and terminology found in the
                job description and your resume.
              </p>

            </div>


            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100">
                <FiBriefcase className="text-2xl text-green-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Experience
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Compares your experience with the experience required
                for the target position.
              </p>

            </div>


            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100">
                <FiBarChart2 className="text-2xl text-purple-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Resume Score
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Provides an overall score based on different aspects
                of your resume analysis.
              </p>

            </div>


            <div className="group p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
                <FiTrendingUp className="text-2xl text-blue-900" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Match Percentage
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Shows how closely your resume matches the skills and
                requirements of the selected job.
              </p>

            </div>

          </div>

        </div>

      </section>


  
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-blue-900">
            How It Works
          </h2>

          <p className="mt-3 text-gray-600">
            Analyze your resume in a few simple steps.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="relative bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-900 text-white">
              <FiUpload className="text-2xl" />
            </div>

            <div className="absolute top-5 right-5 text-sm font-bold text-gray-300">
              01
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              Upload Resume
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              Upload your resume in a supported format such as PDF,
              DOCX, or TXT.
            </p>

          </div>


          <div className="relative bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-900 text-white">
              <FiUserCheck className="text-2xl" />
            </div>

            <div className="absolute top-5 right-5 text-sm font-bold text-gray-300">
              02
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              Select Role
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              Select the role you are applying for, such as Full Stack
              Developer or Cloud Engineer.
            </p>

          </div>


          <div className="relative bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-900 text-white">
              <FiFileText className="text-2xl" />
            </div>

            <div className="absolute top-5 right-5 text-sm font-bold text-gray-300">
              03
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              Add Job Description
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              Provide the job description so your resume can be evaluated
              against the actual requirements.
            </p>

          </div>


          <div className="relative bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-900 text-white">
              <FiCheckCircle className="text-2xl" />
            </div>

            <div className="absolute top-5 right-5 text-sm font-bold text-gray-300">
              04
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              Get Results
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              Receive your resume score, match percentage, missing skills,
              and detailed analysis.
            </p>

          </div>

        </div>

      </section>


     
      <section className="bg-blue-50 py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-blue-900">
              Why Use Resume Analyzer?
            </h2>

            <p className="mt-3 text-gray-600">
              Make your job application process more informed and focused.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">

              <FiTarget className="text-3xl text-blue-900" />

              <h3 className="mt-5 text-xl font-bold text-blue-900">
                Job-Specific Analysis
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                A resume can perform differently for different positions.
                Our analysis focuses on the specific job you are targeting.
              </p>

            </div>


            <div className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">

              <FiBarChart2 className="text-3xl text-blue-900" />

              <h3 className="mt-5 text-xl font-bold text-blue-900">
                Clear Results
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Understand your resume through measurable scores, matching
                percentages, matched skills, and missing skills.
              </p>

            </div>


            {/* Improve */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">

              <FiZap className="text-3xl text-blue-900" />

              <h3 className="mt-5 text-xl font-bold text-blue-900">
                Improve Your Resume
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Use the analysis to identify weaknesses and make your resume
                more relevant to the position you want.
              </p>

            </div>

          </div>

        </div>

      </section>


     
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <div className="flex justify-center mb-6">

          <div className="p-4 rounded-2xl bg-blue-100">
            <FiZap className="text-4xl text-blue-900" />
          </div>

        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Our Goal
        </h2>

        <p className="mt-6 text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">
          Help you understand your resume before an employer does.
        </p>

        <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-7">
          Resume Analyzer aims to make the resume evaluation process
          faster, clearer, and more data-driven, helping job seekers
          make better decisions before submitting their applications.
        </p>

      </section>

    </main>
  );
}

export default AboutPage;

