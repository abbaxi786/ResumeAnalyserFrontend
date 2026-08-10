"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface MissingSkillSuggestion {
    Skill: string;
    Suggestions: string | null;
}

interface DescriptionScores {
    MatchedSkills: string[];
    MissingSkills: string[];
    MatchedKeywords: string[];
    skills_scores: number;
    keyword_scores: number;
    TFIDF_Cosine_Score: number;
}

interface ResumeScores {
    SkillScore: number;
    ExperienceScore: number;
    KeywordScore: number;
    TotalResumeScore: number;
    Suggestion: {
        ExperienceSuggestion?: string;
    } | null;
    DescriptionScores: DescriptionScores;
}

interface SkillsRequiredScores {
    SkillScoresFromRequired: number;
    Match_Skills: string[];
    Not_Matched_Skills: string[];
    MissingSkillWithSuggestions: MissingSkillSuggestion[];
}

interface TextInfo {
    File_extension: string;
    Words: number;
    Characters: number;
    ResumeScores: ResumeScores;
    SkillsRequiredScores: SkillsRequiredScores;
}

interface Resume {
    id: number;
    filename: string;
    url: string;
    role: string;
    description: string;
    required_experience: number;
    text_info: TextInfo;
    rank: number | null;
    score: number | null;
    match_percentage: number | null;
    top_missing_skill: string | null;
    error: string | null;
    created_at: string;
}

function ResumeView() {
    const params = useParams();

    const id = params?.id;

    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoading(true);
                setError("");

                const access = localStorage.getItem("access");

                if (!access) {
                    setError("You are not authenticated.");
                    return;
                }

                if (!id) {
                    setError("Resume ID is missing.");
                    return;
                }

                console.log("Resume ID:", id);

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access}`,
                        },
                    }
                );

                console.log("Full API response:", response.data);

                /*
                    Your backend returns:

                    {
                        "data": {
                            ...
                        }
                    }

                    Therefore we need response.data.data
                */

                const resumeData = response.data.data;

                console.log("Resume object:", resumeData);

                if (!resumeData) {
                    throw new Error("Resume data was not found.");
                }

                setResume(resumeData);
            } catch (err: any) {
                console.error("Failed to fetch resume:", err);

                setError(
                    err?.response?.data?.error ||
                    err?.response?.data?.detail ||
                    err?.message ||
                    "Failed to load resume."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-5 text-blue-900 text-lg font-semibold">
                        Loading resume...
                    </p>
                </div>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 max-w-md w-full text-center">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-bold text-red-600">
                        Unable to Load Resume
                    </h2>

                    <p className="mt-3 text-gray-600">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                    >
                        Try Again
                    </button>

                </div>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Resume Not Found
    |--------------------------------------------------------------------------
    */

    if (!resume) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">
                    Resume not found.
                </p>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Useful values
    |--------------------------------------------------------------------------
    */

    const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "";

    const resumeFileUrl = resume.url?.startsWith("http")
        ? resume.url
        : `${backendUrl}${resume.url}`;

    const descriptionScores =
        resume.text_info?.ResumeScores?.DescriptionScores;

    const requiredSkills =
        resume.text_info?.SkillsRequiredScores;

    const resumeScores =
        resume.text_info?.ResumeScores;

    /*
    |--------------------------------------------------------------------------
    | Main UI
    |--------------------------------------------------------------------------
    */

    return (
        <main className="min-h-screen bg-gray-50 py-8 md:py-10">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Back Button */}

                <button
                    onClick={() => window.history.back()}
                    className="mb-6 inline-flex items-center gap-2 text-blue-900 font-medium hover:text-blue-700 transition"
                >
                    ← Back to Results
                </button>


                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
                        Resume Analysis
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Detailed analysis of {resume.filename}
                    </p>

                </div>



                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 sm:p-6 md:p-8">

                    {/* Resume Header */}

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className="min-w-0">

                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 wrap-break-word">
                                {resume.filename}
                            </h2>

                            <p className="text-blue-900 mt-2 font-semibold capitalize">
                                {resume.role}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Analyzed on{" "}
                                {new Date(
                                    resume.created_at
                                ).toLocaleDateString()}
                            </p>

                        </div>


                        {/* Score */}

                        <div className="bg-blue-900 text-white px-7 py-5 rounded-xl text-center min-w-37.5">

                            <p className="text-sm">
                                Resume Score
                            </p>

                            <p className="text-4xl font-bold mt-1">
                                {resume.score ?? 0}
                            </p>

                        </div>

                    </div>


                    {/* Statistics */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                        {/* Rank */}

                        <div className="bg-blue-50 rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Rank
                            </p>

                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                #{resume.rank ?? "-"}
                            </p>

                        </div>


                        {/* Match */}

                        <div className="bg-blue-50 rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Match Percentage
                            </p>

                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                {resume.match_percentage ?? 0}%
                            </p>

                        </div>


                        {/* Required Experience */}

                        <div className="bg-blue-50 rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Required Experience
                            </p>

                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                {resume.required_experience} years
                            </p>

                        </div>


                        {/* File Type */}

                        <div className="bg-blue-50 rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                File Type
                            </p>

                            <p className="text-2xl font-bold text-blue-900 mt-1 uppercase">
                                {resume.text_info?.File_extension || "-"}
                            </p>

                        </div>

                    </div>


                    {/* Score Breakdown */}

                    {resumeScores && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Score Breakdown
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div className="border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Skill Score
                                    </p>

                                    <p className="text-2xl font-bold text-blue-900 mt-1">
                                        {resumeScores.SkillScore}
                                    </p>

                                </div>


                                <div className="border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Experience Score
                                    </p>

                                    <p className="text-2xl font-bold text-blue-900 mt-1">
                                        {resumeScores.ExperienceScore}
                                    </p>

                                </div>


                                <div className="border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Keyword Score
                                    </p>

                                    <p className="text-2xl font-bold text-blue-900 mt-1">
                                        {resumeScores.KeywordScore}
                                    </p>

                                </div>

                            </div>

                        </div>
                    )}


                    {/* Top Missing Skill */}

                    {resume.top_missing_skill && (
                        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-5">

                            <h3 className="font-bold text-red-700">
                                Top Missing Skill
                            </h3>

                            <p className="mt-2 text-red-600 font-medium capitalize">
                                {resume.top_missing_skill}
                            </p>

                        </div>
                    )}


                    {/* Experience Suggestion */}

                    {resumeScores?.Suggestion?.ExperienceSuggestion && (
                        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-5">

                            <h3 className="font-bold text-yellow-700">
                                Experience Suggestion
                            </h3>

                            <p className="mt-2 text-yellow-700">
                                {resumeScores.Suggestion.ExperienceSuggestion}
                            </p>

                        </div>
                    )}


                    {/* Job Description */}

                    {resume.description && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Job Description
                            </h3>

                            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-5">

                                <p className="text-gray-600 leading-7 whitespace-pre-line">
                                    {resume.description}
                                </p>

                            </div>

                        </div>
                    )}


                    {/* Matched Skills */}

                    {descriptionScores?.MatchedSkills?.length > 0 && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Matched Skills
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {descriptionScores.MatchedSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}

                            </div>

                        </div>
                    )}


                    {/* Missing Skills */}

                    {descriptionScores?.MissingSkills?.length > 0 && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Missing Skills
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {descriptionScores.MissingSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}

                            </div>

                        </div>
                    )}


                    {/* Matched Keywords */}

                    {descriptionScores?.MatchedKeywords?.length > 0 && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Matched Keywords
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {descriptionScores.MatchedKeywords.map(
                                    (keyword) => (
                                        <span
                                            key={keyword}
                                            className="px-3 py-2 rounded-lg bg-blue-100 text-blue-900 text-sm font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    )
                                )}

                            </div>

                        </div>
                    )}


                    {/* Required Skills Analysis */}

                    {requiredSkills && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Required Skills Analysis
                            </h3>


                            <div className="mt-4">

                                <div className="flex justify-between mb-2">

                                    <span className="text-sm font-medium text-gray-600">
                                        Required Skills Match
                                    </span>

                                    <span className="text-sm font-bold text-blue-900">
                                        {requiredSkills.SkillScoresFromRequired.toFixed(
                                            2
                                        )}
                                        %
                                    </span>

                                </div>


                                <div className="w-full bg-gray-200 rounded-full h-3">

                                    <div
                                        className="bg-blue-900 h-3 rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                requiredSkills.SkillScoresFromRequired,
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Matched Required Skills */}

                            {requiredSkills.Match_Skills?.length > 0 && (
                                <div className="mt-6">

                                    <h4 className="font-semibold text-green-700">
                                        Matched Required Skills
                                    </h4>

                                    <div className="flex flex-wrap gap-2 mt-3">

                                        {requiredSkills.Match_Skills.map(
                                            (skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>
                            )}


                            {/* Not Matched Required Skills */}

                            {requiredSkills.Not_Matched_Skills?.length > 0 && (
                                <div className="mt-6">

                                    <h4 className="font-semibold text-red-700">
                                        Unmatched Required Skills
                                    </h4>

                                    <div className="flex flex-wrap gap-2 mt-3">

                                        {requiredSkills.Not_Matched_Skills.map(
                                            (skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        </div>
                    )}


                    {/* Skill Suggestions */}

                    {requiredSkills?.MissingSkillWithSuggestions?.length > 0 && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Skill Improvement Suggestions
                            </h3>

                            <div className="mt-4 space-y-4">

                                {requiredSkills.MissingSkillWithSuggestions.map(
                                    (item) => (
                                        <div
                                            key={item.Skill}
                                            className="border border-gray-200 rounded-xl p-5"
                                        >

                                            <h4 className="font-semibold text-blue-900 capitalize">
                                                {item.Skill}
                                            </h4>

                                            {item.Suggestions ? (
                                                <p className="mt-2 text-gray-600 leading-6">
                                                    {item.Suggestions}
                                                </p>
                                            ) : (
                                                <p className="mt-2 text-gray-400 italic">
                                                    No suggestion available.
                                                </p>
                                            )}

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}


                    {/* Resume Statistics */}

                    {resume.text_info && (
                        <div className="mt-8">

                            <h3 className="text-xl font-bold text-gray-800">
                                Resume Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Words
                                    </p>

                                    <p className="text-2xl font-bold text-gray-800 mt-1">
                                        {resume.text_info.Words}
                                    </p>

                                </div>


                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Characters
                                    </p>

                                    <p className="text-2xl font-bold text-gray-800 mt-1">
                                        {resume.text_info.Characters}
                                    </p>

                                </div>


                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                                    <p className="text-sm text-gray-500">
                                        File Extension
                                    </p>

                                    <p className="text-2xl font-bold text-gray-800 mt-1 uppercase">
                                        {resume.text_info.File_extension}
                                    </p>

                                </div>

                            </div>

                        </div>
                    )}


                    {/* Resume File */}

                    {resume.url && (
                        <div className="mt-8 pt-6 border-t border-gray-200">

                            <a
                                href={resumeFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-medium"
                            >
                                View Original Resume
                            </a>

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

export default ResumeView;