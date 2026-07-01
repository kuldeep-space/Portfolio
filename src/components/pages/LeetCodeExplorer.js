// src/pages/LeetCodeExplorer.jsx
import React, { useEffect, useState, useRef } from "react";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import Preloader from "../Preloader";
import "./LeetCodeExplorer.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('csharp', csharp);

const GITHUB_USERNAME = "kuldeep-creates";
const REPO_NAME = "Leetcode";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN && { Authorization: `Bearer ${TOKEN}` })
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const formatName = (name) =>
  capitalize(name.replace(/-/g, " ").replace(/\.[^/.]+$/, ""));

const getLanguage = (filename) => {
  const ext = filename.split(".").pop();
  if (ext === "cpp") return "cpp";
  if (ext === "py") return "python";
  if (ext === "java") return "java";
  if (ext === "c") return "c";
  if (ext === "cs") return "csharp";
  return "text";
};

// Helper to fetch GitHub API with rate-limit handling
const fetchGitHub = async (url) => {
  const res = await fetch(url, { headers });
  if (res.status === 403) {
    const reset = res.headers.get('X-RateLimit-Reset');
    const wait = reset * 1000 - Date.now();
    console.warn(`Rate limit reached, waiting ${Math.ceil(wait/1000)}s`);
    await new Promise(r => setTimeout(r, wait));
    return fetchGitHub(url); // retry
  }
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'GitHub API error');
  }
  return res.json();
};

const LeetCodeExplorer = () => {
  const [folders, setFolders] = useState([]);
  const [expandedFolder, setExpandedFolder] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [folderPage, setFolderPage] = useState(1);
  const [currentPage] = useState({});
  const [languageData, setLanguageData] = useState(null);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);

  const pageSize = 10;

  useEffect(() => {
    const fetchRepoContents = async () => {
      try {
        // Get repo default branch
        const repoData = await fetchGitHub(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}`);
        const defaultBranch = repoData.default_branch;

        // Fetch repo tree recursively
        const treeData = await fetchGitHub(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/git/trees/${defaultBranch}?recursive=1`
        );

        const foldersMap = {};
        const langCounts = {};

        treeData.tree.forEach(item => {
          const pathParts = item.path.split('/');
          const folderName = pathParts[0];

          if (!foldersMap[folderName]) {
            const match = folderName.match(/^(\d{4})-(.+)/);
            foldersMap[folderName] = {
              id: match ? match[1] : "----",
              name: match ? match[2] : folderName,
              path: folderName,
              files: [],
            };
          }

          if (item.type === 'blob' && pathParts.length > 1) {
            const fileName = pathParts[pathParts.length - 1];
            if (fileName !== 'README.md') {
              const lang = getLanguage(fileName);
              langCounts[lang] = (langCounts[lang] || 0) + 1;
              foldersMap[folderName].files.push({
                sha: item.sha,
                name: fileName,
                path: item.path,
              });
            }
          }
        });

        setFolders(Object.values(foldersMap));

        const chartData = {
          labels: Object.keys(langCounts).map(capitalize),
          datasets: [
            {
              label: 'Total Problems',
              data: Object.values(langCounts),
              backgroundColor: 'rgba(137, 138, 196, 0.6)',
              borderColor: 'rgba(100, 101, 145, 0.8)',
              borderWidth: {
                top: 0,
                right: 6,
                bottom: 6,
                left: 0
              },
              borderSkipped: false,
            },
          ],
        };
        setLanguageData(chartData);

      } catch (err) {
        console.error("Error fetching repo contents:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepoContents();
  }, []);

  useEffect(() => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [folderPage]);

  const toggleFolder = (folderPath) => {
    setExpandedFolder(prev => (prev === folderPath ? null : folderPath));
  };

  const openFile = async (file) => {
    try {
      const repoData = await fetchGitHub(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}`);
      const defaultBranch = repoData.default_branch;

      // Use GitHub API to get file content (base64)
      const fileData = await fetchGitHub(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${file.path}?ref=${defaultBranch}`
      );

      const content = atob(fileData.content); // decode base64
      setFileContent({ name: file.name, content });

    } catch (err) {
      console.error("Error opening file:", err);
      setError(`Failed to open file: ${file.name}`);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setFolderPage(1);
  };

  const filteredFolders = folders.filter(f =>
    f.name.replace(/-/g, " ").toLowerCase().includes(search)
  );

  const folderStart = (folderPage - 1) * pageSize;
  const folderEnd = folderStart + pageSize;
  const visibleFolders = filteredFolders.slice(folderStart, folderEnd);
  const totalFolderPages = Math.ceil(filteredFolders.length / pageSize);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div id="leetcode" className="leetcode-explorer">
      <h1 className="explorer-header">LEETCODE EXPLORER</h1>

      {languageData && (
        <div className="chart-container">
          <h2 className="chart-title">LANGUAGE DISTRIBUTION</h2>
          {(() => {
            const rootStyle = getComputedStyle(document.documentElement);
            const textColor = rootStyle.getPropertyValue('--color-text').trim() || '#e5e7eb';
            const gridColor = 'rgba(255,255,255,0.15)';
            const gridColorY = 'rgba(255,255,255,0.10)';
            return (
              <Bar
                data={languageData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: { color: textColor },
                      grid: { color: gridColor },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 40, color: textColor },
                      grid: { color: gridColorY },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: textColor },
                    },
                  },
                  layout: { padding: { bottom: 60 } },
                }}
              />
            );
          })()}
          
        </div>
      )}

      <div className="controls-wrapper" ref={searchContainerRef}>
        <input
          type="text"
          placeholder="Search Problems..."
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="list-container">
        {error ? (
          <div className="message error">Error: {error}</div>
        ) : visibleFolders.length > 0 ? (
          visibleFolders.map(folder => {
            const isExpanded = expandedFolder === folder.path;
            const page = currentPage[folder.path] || 1;
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const visibleFiles = folder.files.slice(start, end);

            return (
              <div key={folder.path} className={`folder-item ${isExpanded ? "expanded" : ""}`}>
                <div className="folder-header" onClick={() => toggleFolder(folder.path)}>
                  <div className="folder-info">
                    <span className="expand-icon">{isExpanded ? "⯆" : "⯈"}</span>
                    <span className="folder-id">{folder.id}</span>
                    <span className="folder-name">{formatName(folder.name)}</span>
                  </div>
                  <span className="file-count" aria-label={`Files: ${folder.files.length}`}>
                    {folder.files.length}
                  </span>
                </div>
                {isExpanded && (
                  <div className="files-container">
                    {visibleFiles.map(file => (
                      <div key={file.sha} className="file-item" onClick={() => openFile(file)}>
                        <span>{formatName(file.name.slice(5))}</span>
                        <span className="language-tag">{getLanguage(file.name).toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="message">FILE NOT FOUND !</div>
        )}
      </div>

      {totalFolderPages > 1 && (
        <div className="folder-pagination">
          <button className="page-btn" onClick={() => setFolderPage(p => Math.max(1, p - 1))} disabled={folderPage === 1}>Prev</button>
          <span className="page-info">{folderPage}/{totalFolderPages}</span>
          <button className="page-btn" onClick={() => setFolderPage(p => Math.min(totalFolderPages, p + 1))} disabled={folderPage === totalFolderPages}>Next</button>
        </div>
      )}

      {fileContent && (
        <div className="modal-bg" onClick={() => setFileContent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{formatName(fileContent.name.slice(5))}</h2>
              <div className="modal-controls">
                <button className="btn copy-btn" onClick={() => {
                  navigator.clipboard.writeText(fileContent.content);
                  const btn = document.querySelector(".copy-btn");
                  btn.classList.add("copied");
                  setTimeout(() => btn.classList.remove("copied"), 800);
                }}>Copy</button>
                <button className="btn close-btn" onClick={() => setFileContent(null)}>Close</button>
              </div>
            </div>
            <div className="code-container">
              <SyntaxHighlighter language={getLanguage(fileContent.name)} style={vscDarkPlus} showLineNumbers>
                {fileContent.content}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeExplorer;
