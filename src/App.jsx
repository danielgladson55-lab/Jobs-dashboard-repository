import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Globe2,
  Linkedin,
  MapPin,
  Menu,
  RefreshCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const accountLinks = [
  {
    name: "LinkedIn Jobs",
    description: "Technology Risk and IT Audit opportunities",
    url: "https://www.linkedin.com/jobs/",
    accent: "from-sky-500 to-blue-700",
    icon: Linkedin,
  },
  {
    name: "Naukri Jobs",
    description: "India-focused Manager and Assistant Manager roles",
    url: "https://www.naukri.com/",
    accent: "from-indigo-500 to-violet-700",
    icon: BriefcaseBusiness,
  },
  {
    name: "Indeed Jobs",
    description: "Cross-company search and job alerts",
    url: "https://in.indeed.com/",
    accent: "from-blue-600 to-cyan-600",
    icon: Globe2,
  },
  {
    name: "GitHub Job Tracker",
    description: "Automated collection, scoring and status tracking",
    url: "https://github.com/danielgladson55-lab/Job-tracker",
    accent: "from-slate-700 to-slate-950",
    icon: ShieldCheck,
  },
];

const jobs = [
  {
    id: "TR-2601",
    company: "EY",
    title: "Technology Risk Manager",
    location: "Chennai",
    arrangement: "Hybrid",
    region: "Chennai",
    source: "Company Career Portal",
    score: 92,
    posted: "Today",
    skills: ["ITGC", "IT Audit", "Risk Assurance", "Application Controls"],
    resume: "Big 4 Technology Risk",
    url: "https://careers.ey.com/",
  },
  {
    id: "IA-2602",
    company: "AstraZeneca",
    title: "IT Internal Audit Manager",
    location: "Chennai",
    arrangement: "Onsite",
    region: "Chennai",
    source: "Company Career Portal",
    score: 88,
    posted: "1 day ago",
    skills: ["Internal Audit", "Cyber Risk", "Stakeholder Management"],
    resume: "Internal Audit Manager",
    url: "https://careers.astrazeneca.com/",
  },
  {
    id: "GRC-2603",
    company: "Walmart Global Tech",
    title: "Cybersecurity GRC Manager",
    location: "Bengaluru",
    arrangement: "Hybrid",
    region: "Bengaluru",
    source: "Company Career Portal",
    score: 86,
    posted: "2 days ago",
    skills: ["GRC", "Cloud Security", "Third-Party Risk", "ISO 27001"],
    resume: "Cybersecurity GRC",
    url: "https://careers.walmart.com/",
  },
  {
    id: "TR-2604",
    company: "Northern Trust",
    title: "Technology Risk and Controls Lead",
    location: "Bengaluru",
    arrangement: "Hybrid",
    region: "Bengaluru",
    source: "LinkedIn Alert",
    score: 83,
    posted: "Today",
    skills: ["Technology Controls", "Operational Risk", "IAM"],
    resume: "Big 4 Technology Risk",
    url: "https://www.northerntrust.com/united-states/about-us/careers",
  },
  {
    id: "TPRM-2605",
    company: "Example Global SaaS Company",
    title: "Third-Party Cyber Risk Manager",
    location: "Global",
    arrangement: "Fully Remote",
    region: "Global Remote",
    source: "Lever Feed",
    score: 79,
    posted: "3 days ago",
    skills: ["Third-Party Risk", "SOC 2", "Cloud Risk"],
    resume: "Cybersecurity GRC",
    url: "https://jobs.lever.co/",
  },
  {
    id: "IA-2606",
    company: "Example Healthcare Group",
    title: "Technology Internal Audit Lead",
    location: "India",
    arrangement: "Fully Remote",
    region: "India Remote",
    source: "Email Job Alert",
    score: 76,
    posted: "4 days ago",
    skills: ["Healthcare IT", "ITGC", "Resilience", "Audit Reporting"],
    resume: "Internal Audit Manager",
    url: "https://in.indeed.com/",
  },
];

const regionOptions = ["All", "Chennai", "Bengaluru", "India Remote", "Global Remote"];
const arrangementOptions = ["All", "Onsite", "Hybrid", "Fully Remote"];

function ScoreRing({ score }) {
  const color = score >= 85 ? "text-emerald-400" : score >= 75 ? "text-cyan-400" : "text-amber-400";
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
      <div className={`text-xl font-black ${color}`}>{score}</div>
      <div className="absolute bottom-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Match</div>
    </div>
  );
}

function AccountCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const next = () => setIndex((v) => (v + 1) % accountLinks.length);
  const previous = () => setIndex((v) => (v - 1 + accountLinks.length) % accountLinks.length);
  const ordered = Array.from({ length: visible }, (_, i) => accountLinks[(index + i) % accountLinks.length]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Quick access</p>
          <h2 className="mt-1 text-xl font-bold text-white">Job-hunting accounts</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previous} className="rounded-xl border-slate-700 bg-slate-900 text-slate-200">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={next} className="rounded-xl border-slate-700 bg-slate-900 text-slate-200">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {ordered.map((account) => {
            const Icon = account.icon;
            return (
              <motion.a
                layout
                key={account.name}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                href={account.url}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/10"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${account.accent}`} />
                <div className="flex items-start justify-between">
                  <div className={`rounded-2xl bg-gradient-to-br p-3 ${account.accent}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-600 transition group-hover:text-cyan-300" />
                </div>
                <h3 className="mt-5 font-bold text-white">{account.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{account.description}</p>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

function JobCard({ job }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-black/10">
      <div className="flex gap-4">
        <ScoreRing score={job.score} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">{job.id} · {job.source}</p>
              <h3 className="mt-1 text-lg font-bold text-white">{job.title}</h3>
              <p className="font-semibold text-slate-300">{job.company}</p>
            </div>
            <Badge className="border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/10">{job.arrangement}</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" />{job.posted}</span>
            <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" />{job.resume}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill) => <span key={skill} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{skill}</span>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 font-bold text-slate-950 hover:opacity-90">
              <a href={job.url} target="_blank" rel="noreferrer">Open official job <ExternalLink className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-700 bg-transparent text-slate-300">Mark reviewed</Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function JobIntelligenceDashboard() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [arrangement, setArrangement] = useState("All");
  const [minimumScore, setMinimumScore] = useState(65);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState("Today, 07:00 IST");

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.company} ${job.title} ${job.location} ${job.skills.join(" ")}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) &&
      (region === "All" || job.region === region) &&
      (arrangement === "All" || job.arrangement === arrangement) &&
      job.score >= minimumScore;
  }).sort((a, b) => b.score - a.score), [query, region, arrangement, minimumScore]);

  const locationCounts = useMemo(() => ({
    Chennai: jobs.filter((j) => j.region === "Chennai").length,
    Bengaluru: jobs.filter((j) => j.region === "Bengaluru").length,
    "India Remote": jobs.filter((j) => j.region === "India Remote").length,
    "Global Remote": jobs.filter((j) => j.region === "Global Remote").length,
  }), []);

  const refresh = () => {
    setLastRefreshed("Just now · demo refresh");
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 font-black text-slate-950">DG</div>
            <div>
              <p className="font-bold text-white">Job Intelligence Hub</p>
              <p className="text-xs text-slate-500">Technology Risk · IT Audit · GRC</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right text-xs text-slate-500"><p>Last synchronized</p><p className="font-semibold text-slate-300">{lastRefreshed}</p></div>
            <Button onClick={refresh} variant="outline" className="rounded-xl border-slate-700 bg-slate-900 text-slate-200"><RefreshCcw className="mr-2 h-4 w-4" />Refresh</Button>
          </div>
          <Button onClick={() => setMobileOpen(!mobileOpen)} size="icon" variant="outline" className="rounded-xl border-slate-700 bg-slate-900 md:hidden">{mobileOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-[#0b2337] to-[#07373a] p-7 shadow-2xl shadow-cyan-950/20 md:p-10">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300"><Sparkles className="h-3.5 w-3.5" />Live job decision dashboard</div>
              <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">One dashboard for every serious opportunity.</h1>
              <p className="mt-4 max-w-2xl text-slate-300">Consolidate Gmail alerts and official company career feeds, score roles against your Technology Risk profile, and separate Chennai onsite, hybrid, India-remote and global-remote opportunities.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card className="rounded-2xl border-white/10 bg-white/5 text-white"><CardContent className="p-4"><p className="text-3xl font-black text-cyan-300">{jobs.length}</p><p className="text-xs text-slate-400">Active matches</p></CardContent></Card>
              <Card className="rounded-2xl border-white/10 bg-white/5 text-white"><CardContent className="p-4"><p className="text-3xl font-black text-emerald-300">{jobs.filter(j => j.score >= 80).length}</p><p className="text-xs text-slate-400">Priority roles</p></CardContent></Card>
              <Card className="rounded-2xl border-white/10 bg-white/5 text-white"><CardContent className="p-4"><p className="text-3xl font-black text-violet-300">4</p><p className="text-xs text-slate-400">Location lanes</p></CardContent></Card>
              <Card className="rounded-2xl border-white/10 bg-white/5 text-white"><CardContent className="p-4"><p className="text-3xl font-black text-amber-300">3</p><p className="text-xs text-slate-400">Resume tracks</p></CardContent></Card>
            </div>
          </div>
        </section>

        <AccountCarousel />

        <section>
          <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Location intelligence</p><h2 className="mt-1 text-xl font-bold text-white">Opportunity lanes</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(locationCounts).map(([label, count]) => (
              <button key={label} onClick={() => setRegion(label)} className={`rounded-2xl border p-5 text-left transition ${region === label ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-slate-900/75 hover:border-slate-600"}`}>
                <div className="flex items-center justify-between"><MapPin className="h-5 w-5 text-cyan-300" /><span className="text-2xl font-black text-white">{count}</span></div>
                <p className="mt-4 font-bold text-white">{label}</p>
                <p className="text-xs text-slate-500">Click to filter dashboard</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Best-fit roles</p><h2 className="mt-1 text-2xl font-bold text-white">Company career portal opportunities</h2><p className="mt-1 text-sm text-slate-500">Illustrative data in this prototype; production version should consume your GitHub-generated jobs feed.</p></div>
            <Button variant="ghost" onClick={() => { setQuery(""); setRegion("All"); setArrangement("All"); setMinimumScore(65); }} className="justify-start text-slate-400"><RefreshCcw className="mr-2 h-4 w-4" />Reset filters</Button>
          </div>

          <div className="mb-5 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:grid-cols-[1.4fr_1fr_1fr_.8fr]">
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, company or skill" className="rounded-xl border-slate-700 bg-slate-950 pl-9 text-slate-200" /></div>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-300">{regionOptions.map(x => <option key={x}>{x}</option>)}</select>
            <select value={arrangement} onChange={(e) => setArrangement(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-300">{arrangementOptions.map(x => <option key={x}>{x}</option>)}</select>
            <select value={minimumScore} onChange={(e) => setMinimumScore(Number(e.target.value))} className="rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-300"><option value="0">Any score</option><option value="65">65+ match</option><option value="75">75+ match</option><option value="85">85+ match</option></select>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <AnimatePresence>{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</AnimatePresence>
          </div>
          {filteredJobs.length === 0 && <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">No roles match the current filters.</div>}
        </section>
      </main>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-slate-600">Daniel Gladson Arulraj P · Job Intelligence Dashboard · Human review required before every application</footer>
    </div>
  );
}
