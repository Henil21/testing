"use client";
import React, { useState } from "react";
import styles from "./report.module.css";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";

const Report = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const authToken = useSelector((state) => state.auth.token); // Get the auth token from Redux
  const handleGenerateReport = async () => {
    if (!query.trim()) {
      alert("Please enter a query for the report.");
      return;
    }

    setLoading(true);
    try {
      // API call to generate the report
      const response = await axios.post(
        `https://api.axamine.ignitionnestlabs.in/chat/report`,
        null, // No body required
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: { message: query },
          responseType: "blob", // Expect a PDF file in the response
        }
      );

      // Create a URL for the PDF and trigger download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Diagnostic_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setLoading(false);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Axamine - Diagnostic Report</title>
        <meta
          name="description"
          content="Generate a diagnostic report from Axamine's AI-powered system by providing a query."
        />
        <meta
          name="keywords"
          content="Axamine, AI, Diagnostic, Healthcare, Technology"
        />
        <link rel="canonical" href="https://www.axamine.in/report" />
      </Head>
      <div className={styles.main}>
        <section id="report">
          <div className={styles.left}>
            <div className={styles.queryInputSection}>
              <textarea
                name="query"
                id="query"
                rows="5"
                placeholder="Enter your query, e.g., 'Report me about cancer'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.textArea}
              ></textarea>
              <button
                onClick={handleGenerateReport}
                className={`${styles.btn} ${styles.generateBtn} buttonWithGradient`}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.mainHeading}>Generate Diagnostic Report</h2>
            <p className={styles.instructions}>
              Enter a query to generate a diagnostic report powered by Axamine's AI system.
              The report will be downloaded as a PDF file.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Report;
