Diagnostic Assistant
Diagnostic Assistant — Healthcare LLM prototype demonstrating safe RAG-based clinical co-pilot and prompt engineering.

Purpose

Demonstrate a production-oriented RAG-based LLM architecture for healthcare with two modes:
Problematic Mode (black-box) — shows failure modes (bias, lack of transparency, prompt injection).
Bridged Mode (clinical co-pilot) — shows mitigations (structured inputs, prompt validation, provenance, data minimization).
Quick links

Repo: skytronex/diagnostic-assistant
Docs: /docs (architecture, prompt guide, setup)
Demo modes: frontend (Problematic / Bridged)
Project layout (high level)

frontend/: React demo UI (mode toggle, structured form)
backend/: API server, prompt management, RAG ingestion, orchestrator
packages/: shared prompt templates and schemas
models/: fine-tuning scripts and artifacts
infra/: Dockerfiles, k8s manifests, CI workflows
docs/: architecture, prompt guide, case studies, resources
Getting started (dev)

Copy .env.example → .env and fill provider keys (use sandbox keys for dev).
Install dependencies:
If using yarn workspaces: yarn install
Or per-service: cd backend && npm ci, cd frontend && npm ci
Run backend in dev: yarn workspace backend dev or cd backend && npm run dev
Run frontend: cd frontend && npm run start
Build demo index: yarn build:index (requires vector DB credentials)
Security & compliance notes

Never commit PHI or secrets. Use secret manager in CI and production.
Prompt/response audit logs must be sanitized; prefer storing hashes for sensitive prompts.
Role-based access and data minimization enforced in Bridged Mode.
Contributing

Follow branching conventions (feature/, fix/).
Add unit tests and prompt regression tests for changes to prompt templates or retrieval logic.
License

MIT