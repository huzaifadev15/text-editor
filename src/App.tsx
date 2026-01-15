import React, { useState } from "react";
import { Plus, Trash2, Copy, Check } from "lucide-react";

export default function App() {
  const [boldTextStart, setBoldTextStart] = useState("");
  const [description, setDescription] = useState("");
  const [faqs, setFaqs] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [copied, setCopied] = useState(false);

  const addFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      const newFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(newFaqs);
    }
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const processDescription = (text: string) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-600 underline">$1</a>'
    );
    return text;
  };

  const generateHTML = () => {
    const processedDesc = processDescription(description);

    let html = `<p class="mb-[27px]" style="font-size : 18px;">`;

    if (boldTextStart) {
      html += `<strong class="text-xl md:text-2xl font-bold text-gray-900">${boldTextStart}</strong> `;
    }

    html += `${processedDesc}</p>\n`;

    html += `<!-- FAQ heading wrapper -->\n`;
    html += `<div style="margin-bottom: 27px; margin-top: 27px;" class="my-[27px]">\n`;
    html += `<p style="font-size: 42px;" class="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</p>\n`;
    html += `</div>\n`;

    // Grid container
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">\n`;

    faqs.forEach((faq) => {
      if (faq.question && faq.answer) {
        html += `  <div class="bg-gray-50 p-6 rounded-lg">\n`;
        html += `    <h5 class="text-lg md:text-xl font-semibold text-gray-900 mb-3" style="font-size: 18px; font-weight: 800;">${faq.question}</h5>\n`;
        html += `    <p class="text-base md:text-lg leading-snug text-gray-700" style="font-size: 18px">${faq.answer}</p>\n`;
        html += `  </div>\n`;
      }
    });

    html += `</div>`;

    setGeneratedHTML(html);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          FAQ HTML Generator
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Description Section
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bold Text at Start (Optional)
            </label>
            <input
              type="text"
              value={boldTextStart}
              onChange={(e) => setBoldTextStart(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Explore Our Collection"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description Text
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="6"
              placeholder="Enter your description here...&#10;&#10;Use **text** for bold&#10;Use [link text](url) for links&#10;&#10;Example: Visit our **premium collection** at [our store](https://example.com) for more."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Formatting Guide:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Use <code className="bg-blue-100 px-1 rounded">**text**</code>{" "}
                to make text bold
              </li>
              <li>
                • Use{" "}
                <code className="bg-blue-100 px-1 rounded">
                  [link text](url)
                </code>{" "}
                to add links
              </li>
              <li>
                • Example:{" "}
                <code className="bg-blue-100 px-1 rounded text-xs">
                  Check our **latest arrivals** at [our
                  website](https://example.com)
                </code>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              FAQs (Grid Layout)
            </h2>
            <button
              onClick={addFAQ}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Add FAQ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-700">
                    FAQ {index + 1}
                  </h3>
                  <button
                    onClick={() => removeFAQ(index)}
                    className="text-red-600 hover:text-red-800 transition"
                    disabled={faqs.length === 1}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      updateFAQ(index, "question", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter the question..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="4"
                    placeholder="Enter the answer..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={generateHTML}
            className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Generate HTML
          </button>
        </div>

        {generatedHTML && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Generated HTML
              </h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedHTML}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
