
# 🟡 Claude Code — Expanded Cheat Sheet

A practical quick‑ref for using Claude as a coding partner in Cursor/Replit. These are natural‑language commands you can paste directly.

---

## 0) Core Verbs (use everywhere)
**Run · Explain · Fix · Refactor · Test · Generate · Comment · Optimize · Document · Compare · Diff · Search · Replace · Summarize · Plan**

---

## 1) Run / Execute
- Run this code
- Execute this snippet and show stdout/stderr
- Run `python app.py` and stream logs
- Start the dev server and tell me the URL
- Dry‑run this shell command and explain side‑effects

## 2) Explain / Document
- Explain what this file does at a high level
- Add docstrings to all public functions (Google style)
- Create a README section describing setup, run, test
- Summarize this PR in 3 bullets and 1 risk
- Generate inline comments only where logic is non‑obvious

## 3) Debug / Triage
- Reproduce the error, show minimal failing snippet, and hypothesis
- Why am I getting this stack trace? Suggest 3 likely causes
- Create a minimal repro in a new file and run it
- Add logging at key branches to reveal state that caused the bug
- If fix is non‑trivial, propose two approaches with trade‑offs

## 4) Refactor / Improve
- Refactor to smaller pure functions; keep behavior identical
- Convert callbacks → async/await; avoid breaking API surface
- Replace mutable globals with dependency injection
- Extract configuration to `.env.example` and load securely
- Improve performance; include micro‑benchmarks before/after

## 5) Testing (TDD‑style prompts)
- Write unit tests (happy path + 3 edge cases) using <framework>
- Create a failing test capturing this bug, then fix it
- Add property‑based tests for this function
- Generate fixtures/mocks for external services
- Run tests with coverage and list untested lines

**Template you can paste:**
```
Goal: <behavior to guarantee>
Write: tests first (AAA: Arrange/Act/Assert) then code
Constraints: deterministic tests, no network
Report: coverage %, slowest tests
```

## 6) Files / Project Ops (Cursor/Replit)
- Create `src/utils/date.ts` with these functions
- Move this function into `src/core/math.ts` and update imports
- Generate `requirements.txt` from current imports
- Initialize a minimal project scaffold for <stack>
- Create `.env.example` with required keys and add usage notes

## 7) Package & Env
- Add dependency `<name>@<version>` and explain why that version
- Pin all deps; produce a lockfile if applicable
- Audit for vulnerable packages and suggest safe upgrades
- Create a `Makefile` with targets: setup, dev, test, lint, format

## 8) Data / Output / Viz
- Show program output only (no commentary)
- Print first 20 rows and schema
- Plot a quick line chart of <series> (matplotlib), save to `out.png`
- Save results to CSV at `data/out/results.csv`

## 9) Search / Replace / Diff
- Find all uses of `<symbol>` and list file:line
- Suggest a project‑wide rename plan and apply changes
- Show a unified diff of your edits only
- Provide a reversible patch (git apply compatible)

**Diff template prompt:**
```
Make the following changes and return only a unified diff:
- <bullet 1>
- <bullet 2>
```

## 10) Git Hygiene
- Create a commit message (conventional commits) for these changes
- Squash the last 3 commits into one with this message
- Generate a PR description with risks, roll‑back plan, and test notes
- Show `git status` and summarize what to stage/ignore

## 11) Performance / Profiling
- Identify hotspots; show a 5‑line profile summary
- Optimize allocations; avoid repeated work in hot loops
- Add simple benchmarking harness and report times
- Measure memory before/after; ensure no regressions

## 12) Security / Secrets
- Scan for hardcoded secrets and replace with env vars
- Add input validation + safe defaults (fail closed)
- Threat‑model this endpoint (STRIDE quick pass) and list mitigations
- Sanitize logs; avoid PII

## 13) APIs / Networking
- Implement a robust fetch with retries, backoff, and timeouts
- Add schema validation on responses (e.g., Zod/Pydantic)
- Create a typed SDK wrapper with clear errors
- Mock external API in tests

## 14) UX / CLI / DX
- Add a `--help` CLI with subcommands: <a>, <b>, <c>
- Improve error messages; include remediation tips
- Colorize important logs; keep non‑interactive mode plain
- Add progress bars for long‑running tasks

## 15) Prompt‑Engineering for Code Tasks
- Use constraints: “No external deps”, “O(n log n)”, “Constant memory”
- Ask Claude to self‑check: *Validate output against spec; list 3 failure modes*
- Ask for a rubric before coding: *Provide 5 acceptance criteria and verify each*
- Ask for plan‑then‑execute: *First outline steps, then implement after I say GO*

**Self‑check template:**
```
Before finalizing, run a self‑review:
- Correctness vs. spec?
- Edge cases covered?
- Complexity within limits?
- Clear naming and docs?
Return a short verdict + fixes.
```

## 16) Language / Framework Conversions
- Convert this Python module to C#; preserve behavior and tests
- Rewrite React class components → functional + hooks
- Port this GLSL shader to HLSL (URP compatible); include notes

## 17) Common “Snacks” (copy‑paste ready prompts)
- Add comprehensive logging with log levels and structured fields
- Add retry decorator (max_attempts, jitter) to these functions
- Generate an error‑handling middleware returning JSON problems
- Build a small example dataset and tests for it
- Produce a minimal Dockerfile + docker‑compose for local dev

## 18) Guardrails (use when asking Claude to edit files)
- Do not delete code unless specified; prefer deprecation
- Keep public API stable; if breaking, provide a migration guide
- Return only changed files or a diff; avoid dumping entire repo
- For shell commands: default to dry‑run and show what would happen

---

### Mini Reference: One‑liners
- “Run tests with coverage and show only failures.”
- “Find circular deps and propose a fix.”
- “Extract config, add `.env.example`, document keys.”
- “Generate a patch; no commentary.”
- “Create failing test, then fix.”
- “Summarize change risk and roll‑back plan in 3 bullets.”

---

**Tip:** When tasks are big, ask Claude to *propose a plan + acceptance criteria first*, then implement. Treat it like pair‑programming with a strict checklist.
