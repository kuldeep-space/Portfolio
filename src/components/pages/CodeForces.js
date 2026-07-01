import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Preloader from '../Preloader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import './CodeForces.css';

SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('javascript', javascript);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const extToLang = {
  '.cpp': 'C++',
  '.py': 'Python',
  '.java': 'Java',
  '.c': 'C',
  '.cs': 'C#',
  '.js': 'JavaScript',
};

const langToSyntax = {
  'C++': 'cpp',
  'Python': 'python',
  'Java': 'java',
  'C': 'c',
  'C#': 'csharp',
  'JavaScript': 'javascript',
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new TypeError(`Received non-JSON response: ${text.slice(0, 100)}...`);
  }
  return response.json();
};

const problemNameMap = {
  'Odd/Even Increments': 'Odd-Even Increments',
};

export default function CodeForces() {
  const [problems, setProblems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [fileMap, setFileMap] = useState({});
  const [languageData, setLanguageData] = useState(null);
  const searchInputRef = useRef(null);

  const handle = 'mrjaaduji';
  const pageSize = 10;
  const GITHUB_USER = 'kuldeep-creates';
  const REPO_NAME = 'Codeforces';

  useEffect(() => {
    const fetchRepoFiles = async () => {
      try {
        const repoUrl = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents`;
        const files = await fetchJson(repoUrl);
        const map = {};
        files.forEach((file) => {
          const nameOnly = file.name.replace(/\.[^/.]+$/, '');
          const ext = file.name.substring(file.name.lastIndexOf('.')) || '.txt';
          map[nameOnly] = { download_url: file.download_url, ext };
        });
        setFileMap(map);
      } catch (err) {
        console.error('GitHub fetch error:', err);
      }
    };
    fetchRepoFiles();
  }, [GITHUB_USER, REPO_NAME]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await fetchJson(
          `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
        );
        if (data.status !== 'OK') throw new Error(data.comment || 'Failed to fetch');

        const accepted = data.result.filter((sub) => sub.verdict === 'OK');
        const seen = new Set();
        const unique = [];

        for (let sub of accepted) {
          const originalName = sub.problem.name;
          if (!seen.has(originalName)) {
            seen.add(originalName);

            const mappedName = problemNameMap[originalName] || originalName;
            const fileData = fileMap[mappedName];
            const lang = fileData ? extToLang[fileData.ext] || 'Unknown' : 'Unknown';

            unique.push({
              name: originalName,
              language: lang,
              date: new Date(sub.creationTimeSeconds * 1000),
              unixTime: sub.creationTimeSeconds,
            });
          }
        }

        unique.sort((a, b) => b.unixTime - a.unixTime);

        setProblems(unique);
        setFiltered(unique);

        const langCounts = unique.reduce((acc, sub) => {
          acc[sub.language] = (acc[sub.language] || 0) + 1;
          return acc;
        }, {});

        const chartData = {
          labels: Object.keys(langCounts),
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

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (Object.keys(fileMap).length) fetchSubmissions();
  }, [fileMap, handle]);

  useEffect(() => {
    const filteredData = problems.filter((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, problems]);

  if (loading) {
    return <Preloader />;
  }

  if (loading) {
    return <Preloader />;
  }

  const openProblem = async (problem) => {
    try {
      const mappedName = problemNameMap[problem.name] || problem.name;
      const fileData = fileMap[mappedName];
      if (!fileData) throw new Error('Code not found on GitHub');

      const codeRes = await fetch(fileData.download_url);
      if (!codeRes.ok) throw new Error('Failed to fetch code');

      const codeText = await codeRes.text();
      setCode(codeText);
      setSelectedProblem(problem);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProblem(null);
    setCode('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied!');
  };

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchInputRef.current) {
      searchInputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="cf-container">
      <h1 className="cf-header">CODEFORCES SUBMISSIONS</h1>

      {languageData && (
        <div className="chart-container">
          <h2 className="chart-title">LANGUAGE DISTRIBUTION</h2>
          <Bar 
            data={languageData} 
            options={{
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 10 } },
              },
              layout: {
                padding: {
                  bottom: 60, // Adds space at the bottom
                },
              },
              plugins: {
                legend: {
                  display: false,
                }
              }
            }}
          />
        </div>
      )}

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search problem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="cf-search-input"
      />

      <div className="cf-table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Question Name</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((sub, idx) => (
              <tr key={idx} onClick={() => openProblem(sub)}>
                <td>{indexOfFirst + idx + 1}</td>
                <td>{sub.date.toLocaleDateString()}</td>
                <td>{sub.name}</td>
                <td>{sub.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cf-pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span className="page-info">
          {currentPage}/{totalPages}
        </span>
        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="cf-modal-bg" onClick={closeModal}>
          <div className="cf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cf-modal-header">
              <h2>{selectedProblem.name}</h2>
              <div>
                <button onClick={copyCode} className="btn">Copy</button>
                <button onClick={closeModal} className="btn btn-primary">Close</button>
              </div>
            </div>
            <div className="cf-code-container">
              <SyntaxHighlighter 
                language={langToSyntax[selectedProblem.language] || 'text'} 
                style={atomOneDark} 
                showLineNumbers 
                customStyle={{ background: 'transparent', height: '100%', padding: '1rem', margin: '0' }}
                lineNumberStyle={{ 
                  minWidth: '2.25em',
                  paddingRight: '1rem',
                  textAlign: 'right',
                  color: '#999',
                  userSelect: 'none',
                  marginLeft: '-1rem' // Pull line numbers to the left
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
