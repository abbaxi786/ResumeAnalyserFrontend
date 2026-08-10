"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ResumeResult {
  id: number;
  filename: string;
  url: string;
  role: string;
  description: string;
  required_experience: number;
  text_info: any;
  rank: number | null;
  score: number | null;
  match_percentage: number | null;
  top_missing_skill: string | null;
  error: string | null;
  created_at: string;
}

function ResumeResults() {
  const [results, setResults] = useState<ResumeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("access");

        if (!token) {
          setError("You must be logged in to view your resume results.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Fetched resume results:", data);

        if (!response.ok) {
          throw new Error(
            data.detail || data.error || "Failed to fetch resume results."
          );
        }

        console.log("Fetched resume results:", data.data);

        setResults(data.data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while fetching results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600">
            Loading your resume results...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl shadow-md p-8 text-center">
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
            !
          </div>

          <h1 className="mt-4 text-xl font-bold text-gray-800">
            Unable to Load Results
          </h1>

          <p className="mt-2 text-gray-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            Resume Results
          </h1>

          <p className="mt-2 text-gray-600">
            View and compare your previously analyzed resumes.
          </p>
        </div>

        {/* Empty State */}
        {results.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">
              📄
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Resume Results Found
            </h2>

            <p className="mt-2 text-gray-500">
              You have not analyzed any resumes yet.
            </p>

            <Link
              href="/pages/post_resume"
              className="inline-block mt-6 px-5 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Analyze Resume
            </Link>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <p className="text-sm text-gray-500">
                  Total Resumes
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-900">
                  {results.length}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <p className="text-sm text-gray-500">
                  Best Score
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-900">
                  {Math.max(
                    ...results.map((item) => item.score || 0)
                  )}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <p className="text-sm text-gray-500">
                  Best Match
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-900">
                  {Math.max(
                    ...results.map(
                      (item) => item.match_percentage || 0
                    )
                  )}
                  %
                </p>
              </div>

            </div>

            {/* Results Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-blue-900">
                  Analyzed Resumes
                </h2>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-250">

                  <thead className="bg-blue-900 text-white">

                    <tr>
                      <th className="px-6 py-4 text-left">
                        Rank
                      </th>

                      <th className="px-6 py-4 text-left">
                        Resume
                      </th>

                      <th className="px-6 py-4 text-left">
                        Role
                      </th>

                      <th className="px-6 py-4 text-left">
                        Score
                      </th>

                      <th className="px-6 py-4 text-left">
                        Match
                      </th>

                      <th className="px-6 py-4 text-left">
                        Missing Skill
                      </th>

                      <th className="px-6 py-4 text-left">
                        Date
                      </th>

                      <th className="px-6 py-4 text-left">
                        Action
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {results.map((resume, index) => (

                      <tr
                        key={`${resume.filename}-${index}`}
                        className="border-b border-gray-100 hover:bg-blue-50 transition"
                      >

                        {/* Rank */}
                        <td className="px-6 py-4">

                          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold">
                            {resume.rank || index + 1}
                          </span>

                        </td>

                        {/* Filename */}
                        <td className="px-6 py-4">

                          <p className="font-semibold text-gray-800">
                            {resume.filename}
                          </p>

                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">

                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                            {resume.role}
                          </span>

                        </td>

                        {/* Score */}
                        <td className="px-6 py-4">

                          <span className="font-bold text-blue-900">
                            {resume.score ?? 0}
                          </span>

                        </td>

                        {/* Match */}
                        <td className="px-6 py-4">

                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-semibold text-sm">
                            {resume.match_percentage ?? 0}%
                          </span>

                        </td>

                        {/* Missing Skill */}
                        <td className="px-6 py-4">

                          {resume.top_missing_skill ? (
                            <span className="text-red-600 text-sm">
                              {resume.top_missing_skill}
                            </span>
                          ) : (
                            <span className="text-green-600 text-sm">
                              No missing skill
                            </span>
                          )}

                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(
                            resume.created_at
                          ).toLocaleDateString()}
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">

                          {resume.url && (
                            <Link
                              href={`/pages/resume-view/${resume.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 rounded-lg bg-blue-900 text-white text-sm font-medium hover:bg-blue-800 transition"
                            >
                              View
                            </Link>
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default ResumeResults;