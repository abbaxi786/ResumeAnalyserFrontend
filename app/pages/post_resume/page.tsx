"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";


interface ResumeResult {
  filename: string;
  url?: string;
  textInfo?: {
    ResumeScores?: {
      TotalResumeScore?: number;
      DescriptionScores?: {
        skills_scores?: number;
        MissingSkills?: string[];
      };
    };
  };
  ranking?: {
    Rank: number;
    Name: string;
    Score: number;
    MatchPercentage: number;
    TopMissingSkill: string | null;
  };
  error?: string;
}

const roles = [
  "developer",
  "frontend developer",
  "backend developer",
  "full stack developer",
  "software engineer",
  "data scientist",
  "data analyst",
  "machine learning engineer",
];

function PostResume() {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [role, setRole] = useState("");

  const [results, setResults] = useState<ResumeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const selectedFiles = event.target.files;

  if (!selectedFiles) return;

  const newFiles = Array.from(selectedFiles);

  setFiles((previousFiles) => [
    ...previousFiles,
    ...newFiles,
  ]);

  console.log("Selected files:", newFiles);

  event.target.value = "";
};        

const removeFile = (index: number) => {
  setFiles((previousFiles) =>
    previousFiles.filter((_, fileIndex) => fileIndex !== index)
  );
};

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setResults([]);

    if (files.length === 0) {
      setError("Please select at least one resume.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a job description.");
      return;
    }

    if (!requiredExperience) {
      setError("Please enter required experience.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Important: API expects "files"
      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("description", description);
      formData.append(
        "requiredExperience",
        requiredExperience
      );
      formData.append("role", role);

      const access = localStorage.getItem("access");

      if (!access) {
        throw new Error("Missing access token.");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = response.data;

      if (!response.status.toString().startsWith("2")) {
        throw new Error(
          data.error || "Failed to process resumes."
        );
      }

      setResults(data.results || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            Post Resume
          </h1>

          <p className="mt-2 text-gray-600">
            Upload resumes and analyze them against a specific
            job description.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Resume Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resumes
              </label>

              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.rtf"
                onChange={handleFileChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-white hover:file:bg-blue-800"
              />

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Selected files: {files.length}
                  </p>

                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-blue-900 truncate">
                          {file.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-4 text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20"
              >
                <option value="">
                  Select a role
                </option>

                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Required Experience
              </label>

              <input
                type="number"
                min="0"
                value={requiredExperience}
                onChange={(e) =>
                  setRequiredExperience(e.target.value)
                }
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20"
              />

              <p className="mt-1 text-xs text-gray-500">
                Enter experience in years.
              </p>
            </div>

            {/* Job Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={8}
                placeholder="Enter the job description, required skills, responsibilities, qualifications..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Analyzing Resumes..."
                : "Analyze Resumes"}
            </button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <section className="mt-10">

            <div className="mb-5">
              <h2 className="text-2xl font-bold text-blue-900">
                Resume Rankings
              </h2>

              <p className="text-gray-600 mt-1">
                Resumes ranked according to their analysis score.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md">
              <table className="w-full min-w-200 text-left">

                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-5 py-4">
                      Rank
                    </th>

                    <th className="px-5 py-4">
                      Resume
                    </th>

                    <th className="px-5 py-4">
                      Score
                    </th>

                    <th className="px-5 py-4">
                      Match
                    </th>

                    <th className="px-5 py-4">
                      Missing Skill
                    </th>

                    <th className="px-5 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result, index) => {
                    const ranking = result.ranking;

                    return (
                      <tr
                        key={`${result.filename}-${index}`}
                        className="border-t border-gray-200 hover:bg-blue-50 transition"
                      >
                        <td className="px-5 py-4 font-bold text-blue-900">
                          {ranking?.Rank ?? index + 1}
                        </td>

                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-800">
                            {result.filename}
                          </div>
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {ranking?.Score ?? 0}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                            {ranking?.MatchPercentage ?? 0}%
                          </span>
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {ranking?.TopMissingSkill ||
                            "None"}
                        </td>

                        <td className="px-5 py-4">
                          {result.url && (
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-900 hover:underline"
                            >
                              View Resume
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default PostResume;