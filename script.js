// script.js

// Initialize Lucide icons
lucide.createIcons();

// Elements
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchEngine = document.getElementById("searchEngine"); // Hidden input
const advToggleBtn = document.getElementById("advToggleBtn");
const advPanel = document.getElementById("advPanel");

// Theme Management
function initTheme() {
  const isDark =
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    htmlEl.classList.add("dark");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    htmlEl.classList.remove("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
}

themeToggle.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  const isDark = htmlEl.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (isDark) {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
});

// Stoic Quotes
const stoicQuotes = [
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
  },
  {
    text: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus",
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
  },
  {
    text: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius",
  },
  {
    text: "If it is not right do not do it; if it is not true do not say it.",
    author: "Marcus Aurelius",
  },
  {
    text: "He who fears death will never do anything worth of a man who is alive.",
    author: "Seneca",
  },
  {
    text: "There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.",
    author: "Epictetus",
  },
  {
    text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    author: "Epictetus",
  },
];

function getRandomQuote() {
  const r = Math.floor(Math.random() * stoicQuotes.length);
  quoteText.innerText = `"${stoicQuotes[r].text}"`;
  quoteAuthor.innerText = `— ${stoicQuotes[r].author}`;
}

// Advanced Search Panel Toggle
let advOpen = false;
advToggleBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  advOpen = !advOpen;
  if (advOpen) {
    advPanel.style.maxHeight = advPanel.scrollHeight + "px";
    advPanel.classList.add("mt-4", "opacity-100", "border", "border-slate-200", "dark:border-slate-700/50");
    advPanel.classList.remove("mt-0", "opacity-0", "border-0", "border-transparent", "dark:border-transparent");
    advToggleBtn.classList.add("text-primary");
    advToggleBtn.classList.remove("text-slate-400", "dark:text-slate-500");
  } else {
    advPanel.style.maxHeight = "0px";
    advPanel.classList.remove("mt-4", "opacity-100", "border", "border-slate-200", "dark:border-slate-700/50");
    advPanel.classList.add("mt-0", "opacity-0", "border-0", "border-transparent", "dark:border-transparent");
    advToggleBtn.classList.remove("text-primary");
    advToggleBtn.classList.add("text-slate-400", "dark:text-slate-500");
  }
});

// Handle option selection
const engineOptions = document.querySelectorAll(".engine-option");

function updateActiveEngineUI(selectedValue) {
  engineOptions.forEach(opt => {
    if (opt.getAttribute("data-value") === selectedValue) {
      opt.classList.add("text-primary", "bg-slate-100", "dark:bg-slate-700/50");
      opt.classList.remove("text-slate-400");
    } else {
      opt.classList.remove("text-primary", "bg-slate-100", "dark:bg-slate-700/50");
      opt.classList.add("text-slate-400");
    }
  });
}

engineOptions.forEach(option => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    const value = e.currentTarget.getAttribute("data-value");
    
    // Update hidden input
    searchEngine.value = value;
    
    // Update UI styling
    updateActiveEngineUI(value);

    // Save to local storage
    localStorage.setItem("preferredEngine", value);
    
    // Focus search input
    searchInput.focus();
  });
});

// Search Logic
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const engine = searchEngine.value;
  const baseQuery = searchInput.value.trim();

  const engineMap = {
    google: { baseUrl: "https://www.google.com/search", param: "q" },
    duckduckgo: { baseUrl: "https://duckduckgo.com/", param: "q" },
    bing: { baseUrl: "https://www.bing.com/search", param: "q" },
    yahoo: { baseUrl: "https://search.yahoo.com/search", param: "p" },
    yandex: { baseUrl: "https://yandex.com/search/", param: "text" },
    youtube: { baseUrl: "https://www.youtube.com/results", param: "search_query" },
    wikipedia: { baseUrl: "https://en.wikipedia.org/w/index.php", param: "search" },
    reddit: { baseUrl: "https://www.reddit.com/search/", param: "q" },
    github: { baseUrl: "https://github.com/search", param: "q" }
  };
  const targetEngine = engineMap[engine] || engineMap["google"];

  if (advOpen) {
    // Construct advanced search query
    let queryParts = [];

    // --- Term-based additions for Google ---

    // All these words
    const advAll = document.getElementById("advAll").value.trim();
    if (advAll) queryParts.push(advAll);

    // Exact
    const advExact = document.getElementById("advExact").value.trim();
    if (advExact) queryParts.push(`"${advExact}"`);

    // Any (OR)
    const advAny = document.getElementById("advAny").value.trim();
    if (advAny) {
      const anyParts = advAny.split(" ").filter(Boolean).join(" OR ");
      queryParts.push(anyParts);
    }

    // None (-)
    const advNone = document.getElementById("advNone").value.trim();
    if (advNone) {
      const noneParts = advNone
        .split(",")
        .map((n) => `-${n.trim()}`)
        .join(" ");
      queryParts.push(noneParts);
    }

    // Numbers range
    const numFrom = document.getElementById("advNumForm").value.trim();
    const numTo = document.getElementById("advNumTo").value.trim();
    if (numFrom || numTo) {
      queryParts.push(`${numFrom}..${numTo}`);
    }

    // Site / Domain
    const site = document.getElementById("advSite").value.trim();
    if (site) {
      queryParts.push(`site:${site}`);
    }

    // File type
    const type = document.getElementById("advType").value;
    if (type) {
      queryParts.push(`filetype:${type}`);
    }

    // Terms appearing
    const termsAppearing = document.getElementById("advTerms").value;
    let finalBaseQuery = baseQuery;

    // Combine all query parts
    if (queryParts.length > 0) {
      finalBaseQuery = `${finalBaseQuery} ${queryParts.join(" ")}`.trim();
    }

    if (finalBaseQuery && termsAppearing !== "anywhere") {
      if (termsAppearing === "title")
        finalBaseQuery = `allintitle:${finalBaseQuery}`;
      if (termsAppearing === "text")
        finalBaseQuery = `allintext:${finalBaseQuery}`;
      if (termsAppearing === "url")
        finalBaseQuery = `allinurl:${finalBaseQuery}`;
      // links is more complex (link: URL), omitting for general query terms
    }

    // Create base URL depending on engine
    let url = new URL(targetEngine.baseUrl);
    url.searchParams.set(targetEngine.param, finalBaseQuery);

    if (engine === "google") {
      // Add specific URL parameters for Google
      const lang = document.getElementById("advLang").value;
      if (lang) url.searchParams.set("lr", lang);

      const region = document.getElementById("advRegion").value;
      if (region) url.searchParams.set("cr", region);

      const update = document.getElementById("advUpdate").value;
      if (update) url.searchParams.set("as_qdr", update);
    } else if (engine === "duckduckgo") {
      const time = document.getElementById("advUpdate").value; // d, w, m, y
      if (time) url.searchParams.set("df", time); // DDG format
    }

    if (finalBaseQuery.length > 0) {
      window.location.href = url.toString();
    }
  } else {
    // Simple search
    if (!baseQuery) return;
    let url = new URL(targetEngine.baseUrl);
    url.searchParams.set(targetEngine.param, baseQuery);
    window.location.href = url.toString();
  }
});

// Initialization
initTheme();
getRandomQuote();

// Load preferred engine
const savedEngine = localStorage.getItem("preferredEngine") || "google";
searchEngine.value = savedEngine;
updateActiveEngineUI(savedEngine);

