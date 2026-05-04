import type { IconNode, SVGProps } from "lucide";
import { DEFAULT_INSTRUCTIONS } from "./markdown";
import {
  AlertTriangle,
  AlignLeft,
  Archive,
  BadgeCheck,
  Ban,
  Bookmark,
  Bug,
  Calendar,
  Check,
  CheckCheck,
  CircleAlert,
  CircleCheck,
  CircleDot,
  Clock,
  Code,
  Copy,
  Database,
  ExternalLink,
  Eye,
  File,
  Flag,
  Folder,
  Globe,
  GripVertical,
  Heart,
  HelpCircle,
  Hourglass,
  Inbox,
  Info,
  Lightbulb,
  Link2,
  ListChecks,
  LoaderCircle,
  List,
  ListTodo,
  MessageSquare,
  Monitor,
  Moon,
  Palette,
  Pause,
  Pencil,
  Pin,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Tag,
  Target,
  Trash2,
  Trophy,
  Users,
  Volume2,
  VolumeX,
  X,
  Zap
} from "lucide";

export interface BoardSummary {
  id: string;
  fileName: string;
  filePath: string;
}

export interface AppShellOptions {
  fileName: string;
  filePath: string;
  boards?: BoardSummary[];
  activeBoardId?: string;
}

type RenderableIconNode = Array<[tag: string, attrs: SVGProps, children?: RenderableIconNode]>;

const browserIcons = {
  alignLeft: renderLucideIcon(AlignLeft),
  close: renderLucideIcon(X),
  copy: renderLucideIcon(Copy),
  externalLink: renderLucideIcon(ExternalLink),
  github: `<svg class="lucide-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>`,
  globe: renderLucideIcon(Globe),
  grip: renderLucideIcon(GripVertical),
  eye: renderLucideIcon(Eye),
  info: renderLucideIcon(Info),
  link: renderLucideIcon(Link2),
  monitor: renderLucideIcon(Monitor),
  moon: renderLucideIcon(Moon),
  palette: renderLucideIcon(Palette),
  sun: renderLucideIcon(Sun),
  plus: renderLucideIcon(Plus),
  play: renderLucideIcon(Play),
  reload: renderLucideIcon(RefreshCw),
  rocket: renderLucideIcon(Rocket),
  settings: renderLucideIcon(Settings),
  statusError: renderLucideIcon(CircleAlert),
  statusSaved: renderLucideIcon(CircleCheck),
  statusSaving: renderLucideIcon(LoaderCircle),
  trash: renderLucideIcon(Trash2),
  volume: renderLucideIcon(Volume2),
  volumeMute: renderLucideIcon(VolumeX)
} satisfies Record<string, string>;

const columnIconChoices: Array<{ name: string; label: string; icon: IconNode }> = [
  { name: "list", label: "List", icon: List },
  { name: "todo", label: "Todo list", icon: ListTodo },
  { name: "list-checks", label: "Checklist", icon: ListChecks },
  { name: "circle-dot", label: "In progress", icon: CircleDot },
  { name: "check", label: "Done", icon: CircleCheck },
  { name: "tick", label: "Tick", icon: Check },
  { name: "double-tick", label: "Double tick", icon: CheckCheck },
  { name: "badge-check", label: "Verified", icon: BadgeCheck },
  { name: "shield-check", label: "Approved", icon: ShieldCheck },
  { name: "clock", label: "Clock", icon: Clock },
  { name: "hourglass", label: "Hourglass", icon: Hourglass },
  { name: "calendar", label: "Calendar", icon: Calendar },
  { name: "alert", label: "Alert", icon: CircleAlert },
  { name: "warning", label: "Warning", icon: AlertTriangle },
  { name: "info", label: "Info", icon: Info },
  { name: "help", label: "Help", icon: HelpCircle },
  { name: "ban", label: "Blocked", icon: Ban },
  { name: "inbox", label: "Inbox", icon: Inbox },
  { name: "archive", label: "Archive", icon: Archive },
  { name: "star", label: "Star", icon: Star },
  { name: "flag", label: "Flag", icon: Flag },
  { name: "bookmark", label: "Bookmark", icon: Bookmark },
  { name: "pin", label: "Pin", icon: Pin },
  { name: "tag", label: "Tag", icon: Tag },
  { name: "target", label: "Target", icon: Target },
  { name: "zap", label: "Zap", icon: Zap },
  { name: "rocket", label: "Rocket", icon: Rocket },
  { name: "trophy", label: "Trophy", icon: Trophy },
  { name: "lightbulb", label: "Idea", icon: Lightbulb },
  { name: "heart", label: "Heart", icon: Heart },
  { name: "file", label: "File", icon: File },
  { name: "folder", label: "Folder", icon: Folder },
  { name: "pencil", label: "Edit", icon: Pencil },
  { name: "eye", label: "Review", icon: Eye },
  { name: "bug", label: "Bug", icon: Bug },
  { name: "code", label: "Code", icon: Code },
  { name: "database", label: "Database", icon: Database },
  { name: "users", label: "Users", icon: Users },
  { name: "message", label: "Message", icon: MessageSquare },
  { name: "play", label: "Play", icon: Play },
  { name: "pause", label: "Pause", icon: Pause }
];

const columnIconMap: Record<string, string> = Object.fromEntries(
  columnIconChoices.map((entry) => [entry.name, renderLucideIcon(entry.icon)])
);

const columnIconCatalog = columnIconChoices.map((entry) => ({
  name: entry.name,
  label: entry.label
}));

const themePresets: Array<{ value: string; label: string }> = [
  { value: "#0c66e4", label: "Blue" },
  { value: "#1d7afc", label: "Sky" },
  { value: "#0747a6", label: "Deep blue" },
  { value: "#5e4db2", label: "Purple" },
  { value: "#6e5dc6", label: "Lavender" },
  { value: "#a23b94", label: "Magenta" },
  { value: "#e774bb", label: "Pink" },
  { value: "#c9372c", label: "Red" },
  { value: "#ae2e24", label: "Crimson" },
  { value: "#f08c00", label: "Orange" },
  { value: "#f5cd47", label: "Yellow" },
  { value: "#b6740f", label: "Mustard" },
  { value: "#1f845a", label: "Green" },
  { value: "#4bce97", label: "Mint" },
  { value: "#44546f", label: "Slate" },
  { value: "#172b4d", label: "Ink" }
];

export function renderAppShell(options: AppShellOptions): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(options.fileName)} - kanban-cli</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f5f7;
      --surface: #ffffff;
      --column-bg: #ebecf0;
      --column-bg-hover: #e2e4ea;
      --ink: #172b4d;
      --ink-soft: #344563;
      --muted: #5e6c84;
      --line: #dfe1e6;
      --line-strong: #c1c7d0;
      --accent: #0c66e4;
      --accent-strong: #0747a6;
      --accent-soft: rgba(12, 102, 228, 0.12);
      --ok: #1f845a;
      --warn: #b8770a;
      --danger: #c9372c;
      --ink-rgb: 9, 30, 66;
      --shadow-card: 0 1px 1px rgba(var(--ink-rgb), 0.13), 0 0 1px rgba(var(--ink-rgb), 0.10);
      --shadow-card-hover: 0 2px 4px rgba(var(--ink-rgb), 0.16), 0 0 1px rgba(var(--ink-rgb), 0.12);
      --radius-sm: 4px;
      --radius: 6px;
      --radius-lg: 8px;
      --topbar-height: 52px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    [data-theme="dark"] {
      color-scheme: dark;
      --bg: #0c0f15;
      --surface: #161a23;
      --column-bg: #1d2230;
      --column-bg-hover: #252b3b;
      --ink: #e6edf3;
      --ink-soft: #c9d1d9;
      --muted: #8b95a5;
      --line: #2a3142;
      --line-strong: #3a4254;
      --accent: #4c8ef5;
      --accent-strong: #6fa3f7;
      --accent-soft: rgba(76, 142, 245, 0.18);
      --ok: #4ade80;
      --warn: #fbbf24;
      --danger: #f87171;
      --ink-rgb: 255, 255, 255;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
      margin: 0;
    }

    body {
      background: var(--bg);
      color: var(--ink);
      font-size: 14px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
    }

    button,
    input,
    textarea {
      font: inherit;
      color: inherit;
    }

    button {
      align-items: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink-soft);
      cursor: pointer;
      display: inline-flex;
      gap: 6px;
      height: 32px;
      justify-content: center;
      padding: 0 10px;
      transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
    }

    button:hover {
      background: rgba(var(--ink-rgb), 0.06);
      color: var(--ink);
    }

    button:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 1px;
    }

    .shell {
      display: grid;
      grid-template-rows: var(--topbar-height) 1fr;
      height: 100vh;
    }

    .topbar {
      align-items: center;
      background: var(--surface);
      border-bottom: 1px solid var(--line);
      display: flex;
      gap: 12px;
      padding: 0 16px;
    }

    .brand {
      align-items: center;
      display: flex;
      gap: 10px;
      flex: 1 1 0;
      min-width: 0;
    }

    .brand-mark {
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      flex: 0 0 auto;
    }

    .board-switcher {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      color: var(--ink);
      cursor: pointer;
      flex: 0 0 auto;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      max-width: 220px;
      padding: 4px 8px;
      transition: border-color 120ms ease, background-color 120ms ease;
    }

    .board-switcher:hover {
      border-color: var(--line-strong);
    }

    .board-switcher:focus-visible {
      border-color: var(--accent);
      outline: none;
    }

    .board-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink);
      flex: 1 1 auto;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
      min-width: 0;
      outline: none;
      overflow: hidden;
      padding: 5px 7px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .board-title:hover {
      background: rgba(var(--ink-rgb), 0.04);
    }

    .board-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .board-title::placeholder {
      color: var(--muted);
      font-weight: 500;
    }

    .copy-prompt-btn {
      align-items: center;
      background: var(--accent-soft);
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--accent-strong);
      display: inline-flex;
      flex: 0 0 auto;
      font-size: 13px;
      font-weight: 500;
      gap: 6px;
      height: 32px;
      padding: 0 12px;
      transition: background-color 120ms ease, color 120ms ease, transform 120ms ease;
    }

    .copy-prompt-btn:hover {
      background: rgba(12, 102, 228, 0.18);
      color: var(--accent-strong);
    }

    .copy-prompt-btn.is-flash {
      background: var(--accent);
      color: #ffffff;
    }

    .copy-prompt-btn .lucide-icon {
      height: 14px;
      width: 14px;
    }

    @media (max-width: 720px) {
      .copy-prompt-btn span {
        display: none;
      }

      .copy-prompt-btn {
        padding: 0 8px;
      }
    }

    .top-actions {
      align-items: center;
      display: flex;
      flex: 1 1 0;
      gap: 6px;
      justify-content: flex-end;
      min-width: 0;
    }

    .theme-button {
      align-items: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      cursor: pointer;
      display: inline-flex;
      flex: 0 0 auto;
      height: 32px;
      justify-content: center;
      padding: 0 4px;
    }

    .theme-button:hover {
      background: rgba(var(--ink-rgb), 0.06);
    }

    .theme-button .lucide-icon {
      pointer-events: none;
    }

    .theme-swatch {
      align-items: center;
      background: var(--accent);
      border: 1px solid rgba(var(--ink-rgb), 0.16);
      border-radius: 999px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 0 auto;
      height: 22px;
      justify-content: center;
      pointer-events: none;
      width: 22px;
    }

    .theme-swatch .lucide-icon {
      height: 12px;
      width: 12px;
    }

    .theme-popover {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: 0 8px 24px rgba(var(--ink-rgb), 0.18), 0 0 1px rgba(var(--ink-rgb), 0.16);
      display: grid;
      gap: 6px;
      grid-template-columns: repeat(4, 28px);
      padding: 10px;
      position: fixed;
      z-index: 50;
    }

    .theme-choice {
      border: 2px solid transparent;
      border-radius: 999px;
      cursor: pointer;
      height: 28px;
      padding: 0;
      width: 28px;
    }

    .theme-choice:hover {
      transform: scale(1.06);
    }

    .theme-choice.is-active {
      border-color: var(--ink);
    }

    .status {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 12px;
      gap: 6px;
      height: 32px;
      padding: 0 8px;
      white-space: nowrap;
    }

    .lucide-icon {
      display: block;
      flex: 0 0 auto;
      height: 16px;
      stroke-width: 2;
      width: 16px;
    }

    .status-icon {
      align-items: center;
      color: var(--ok);
      display: inline-flex;
      flex: 0 0 auto;
      justify-content: center;
    }

    .status-icon .lucide-icon {
      height: 14px;
      width: 14px;
    }

    .status.is-saving .status-icon {
      color: var(--warn);
    }

    .status.is-saving .status-icon .lucide-icon {
      animation: spin 900ms linear infinite;
    }

    .status.is-error .status-icon {
      color: var(--danger);
    }

    .ghost {
      font-weight: 500;
    }

    .primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
      font-weight: 600;
      padding: 0 12px;
    }

    .primary:hover {
      background: var(--accent-strong);
      border-color: var(--accent-strong);
      color: #ffffff;
    }

    .board-wrap {
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }

    .board {
      align-items: flex-start;
      display: flex;
      gap: 12px;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 16px;
      scroll-padding: 16px;
    }

    .column {
      background: var(--column-bg);
      border-radius: var(--radius-lg);
      display: flex;
      flex: 0 0 320px;
      flex-direction: column;
      max-height: 100%;
      max-width: 320px;
      min-height: 80px;
      min-width: 320px;
      width: 320px;
    }

    .column.column-dragging {
      opacity: 0.5;
    }

    .column-head {
      align-items: center;
      display: grid;
      gap: 4px;
      grid-template-columns: 22px 26px minmax(0, 1fr) 28px 28px;
      padding: 10px 8px 6px 10px;
    }

    .column-grip {
      align-items: center;
      color: var(--muted);
      cursor: grab;
      display: inline-flex;
      font-size: 14px;
      height: 24px;
      justify-content: center;
      line-height: 1;
      opacity: 0.5;
      padding: 0;
      transition: opacity 120ms ease;
      user-select: none;
      width: 22px;
    }

    .column-grip .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .column:hover .column-grip {
      opacity: 1;
    }

    .column-grip:active {
      cursor: grabbing;
    }

    .icon-button {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 16px;
      height: 28px;
      justify-content: center;
      line-height: 1;
      padding: 0;
      width: 28px;
    }

    .icon-button .lucide-icon {
      height: 15px;
      width: 15px;
    }

    .icon-button:hover {
      color: var(--ink);
    }

    .copy-link {
      opacity: 0.5;
      transition: opacity 120ms ease, color 120ms ease, background-color 120ms ease;
    }

    .column:hover .copy-link,
    .card:hover .copy-link,
    .copy-link:focus-visible,
    .copy-link.is-flash {
      opacity: 1;
    }

    .copy-link.is-flash {
      color: var(--accent);
    }

    @keyframes deeplink-flash {
      0% { box-shadow: 0 0 0 2px var(--accent); }
      100% { box-shadow: var(--shadow-card); }
    }

    .card.is-deeplink-target,
    .column.is-deeplink-target {
      animation: deeplink-flash 1500ms ease-out;
    }

    .column-icon-btn {
      color: var(--ink-soft);
      height: 26px;
      opacity: 0.55;
      transition: opacity 120ms ease, color 120ms ease, background-color 120ms ease;
      width: 26px;
    }

    .column-icon-btn .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .column-icon-btn.has-icon {
      color: var(--accent);
      opacity: 1;
    }

    .column:hover .column-icon-btn,
    .column-icon-btn:focus-visible,
    .column-icon-btn.is-open {
      opacity: 1;
    }

    .column-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink);
      font-size: 14px;
      font-weight: 600;
      min-width: 0;
      outline: none;
      padding: 5px 7px;
      width: 100%;
    }

    .column-title:hover {
      background: rgba(var(--ink-rgb), 0.04);
    }

    .column-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .icon-popover {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: 0 8px 24px rgba(var(--ink-rgb), 0.18), 0 0 1px rgba(var(--ink-rgb), 0.16);
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 8px;
      position: fixed;
      width: 208px;
      z-index: 50;
    }

    .icon-popover-search {
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      color: var(--ink);
      font: inherit;
      font-size: 13px;
      outline: none;
      padding: 5px 8px;
      width: 100%;
    }

    .icon-popover-search:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .icon-popover-grid {
      display: grid;
      gap: 4px;
      grid-template-columns: repeat(6, 28px);
      max-height: 252px;
      overflow-y: auto;
      scrollbar-width: thin;
    }

    .icon-popover-empty {
      color: var(--muted);
      font-size: 12px;
      padding: 6px 4px;
      text-align: center;
    }

    .icon-choice {
      align-items: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      color: var(--ink-soft);
      cursor: pointer;
      display: inline-flex;
      height: 28px;
      justify-content: center;
      padding: 0;
      width: 28px;
    }

    .icon-choice:hover {
      background: rgba(var(--ink-rgb), 0.06);
      color: var(--ink);
    }

    .icon-choice.is-active {
      background: var(--accent-soft);
      color: var(--accent);
    }

    .icon-choice .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .icon-popover-clear {
      height: 26px;
      justify-content: flex-start;
      padding: 0 6px;
      width: 100%;
    }

    .cards {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      gap: 8px;
      min-height: 8px;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 4px 8px;
      scrollbar-width: none;
    }

    .cards::-webkit-scrollbar {
      display: none;
      width: 0;
    }

    .card {
      background: var(--surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow-card);
      cursor: grab;
      display: grid;
      gap: 4px;
      padding: 8px 8px 8px 8px;
      transition: box-shadow 120ms ease;
    }

    .card:hover {
      box-shadow: var(--shadow-card-hover);
    }

    .card:active {
      cursor: grabbing;
    }

    .card.card-dragging {
      opacity: 0.5;
    }

    .card-top {
      align-items: start;
      display: grid;
      gap: 4px;
      grid-template-columns: 22px minmax(0, 1fr) 26px 26px;
    }

    .card-top .card-check,
    .card-top .icon-button {
      margin-top: 1px;
    }

    .card-top .card-check {
      margin-top: 6px;
    }

    .card-check {
      accent-color: var(--accent);
      cursor: pointer;
      height: 14px;
      justify-self: center;
      margin: 0;
      width: 14px;
    }

    .card-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      color: var(--ink);
      display: block;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.35;
      min-height: 26px;
      min-width: 0;
      outline: none;
      overflow: hidden;
      overflow-wrap: anywhere;
      padding: 4px 6px;
      resize: none;
      white-space: pre-wrap;
      width: 100%;
      word-break: break-word;
    }

    .card-title:hover {
      background: rgba(var(--ink-rgb), 0.04);
    }

    .card-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .card-desc-indicator {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      margin-left: 26px;
      padding: 2px 6px;
    }

    .card-desc-indicator .lucide-icon {
      height: 14px;
      width: 14px;
    }

    .card.is-done .card-title {
      color: var(--muted);
      text-decoration: line-through;
    }

    .card-dialog {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: 0 24px 48px rgba(var(--ink-rgb), 0.32), 0 0 1px rgba(var(--ink-rgb), 0.16);
      color: var(--ink);
      max-width: min(640px, 92vw);
      padding: 0;
      width: 100%;
    }

    .card-dialog::backdrop {
      background: rgba(var(--ink-rgb), 0.5);
      backdrop-filter: blur(2px);
    }

    .card-dialog-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 20px 22px 22px;
    }

    .card-dialog-head {
      align-items: flex-start;
      border-bottom: 1px solid var(--line);
      display: flex;
      gap: 8px;
      padding-bottom: 12px;
    }

    .card-dialog-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink);
      flex: 1 1 auto;
      font-family: inherit;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      min-height: 32px;
      min-width: 0;
      outline: none;
      overflow: hidden;
      overflow-wrap: anywhere;
      padding: 6px 8px;
      resize: none;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .card-dialog-title:hover {
      background: rgba(var(--ink-rgb), 0.04);
    }

    .card-dialog-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .card-dialog-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .card-dialog-label {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 12px;
      font-weight: 600;
      gap: 6px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .card-dialog-label .lucide-icon {
      height: 14px;
      width: 14px;
    }

    .card-dialog-description {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      color: var(--ink);
      font-family: inherit;
      font-size: 14px;
      line-height: 1.55;
      min-height: 200px;
      outline: none;
      padding: 12px 14px;
      resize: vertical;
      width: 100%;
    }

    .card-dialog-description::placeholder {
      color: var(--muted);
    }

    .card-dialog-description:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .card-dialog-heading {
      color: var(--ink);
      flex: 1 1 auto;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
      padding: 6px 8px;
    }

    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .settings-section-title {
      color: var(--ink);
      font-size: 13px;
      font-weight: 600;
      margin: 0;
    }

    .settings-section-help {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
      margin: 0;
    }

    .settings-actions {
      display: flex;
      gap: 6px;
      justify-content: flex-end;
    }

    .settings-links {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .settings-link {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--ink);
      display: flex;
      font-size: 13px;
      gap: 10px;
      padding: 10px 12px;
      text-decoration: none;
      transition: background-color 120ms ease, border-color 120ms ease;
    }

    .settings-link:hover {
      background: var(--ink-hover, rgba(15, 15, 15, 0.04));
      border-color: var(--line-strong, #d4d4d4);
    }

    .settings-link .lucide-icon {
      color: var(--muted);
      flex: 0 0 auto;
    }

    .settings-link-label {
      font-weight: 500;
    }

    .settings-link-host {
      color: var(--muted);
      flex: 1 1 auto;
      font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 12px;
      text-align: right;
    }

    .settings-dialog {
      max-width: min(760px, 94vw);
    }

    .settings-dialog-form {
      display: grid;
      gap: 0;
      grid-template-columns: 180px 1fr;
      max-height: min(560px, 80vh);
      padding: 0;
    }

    .settings-nav {
      background: rgba(15, 15, 15, 0.02);
      border-right: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 18px 14px;
    }

    .settings-nav-title {
      color: var(--muted);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      margin: 0 6px 8px;
      text-transform: uppercase;
    }

    .settings-nav-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .settings-nav-item {
      align-items: center;
      background: transparent;
      border: none;
      border-radius: 6px;
      color: var(--ink);
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      gap: 8px;
      padding: 7px 10px;
      text-align: left;
      transition: background-color 120ms ease, color 120ms ease;
    }

    .settings-nav-item:hover {
      background: rgba(15, 15, 15, 0.04);
    }

    .settings-nav-item.is-active {
      background: var(--accent-soft, rgba(12, 102, 228, 0.1));
      color: var(--accent, #0c66e4);
    }

    .settings-nav-item .lucide-icon,
    .settings-nav-item svg {
      flex: 0 0 auto;
      height: 14px;
      width: 14px;
    }

    .settings-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    .settings-main-head {
      align-items: center;
      border-bottom: 1px solid var(--line);
      display: flex;
      gap: 8px;
      justify-content: space-between;
      padding: 14px 18px;
    }

    .settings-main-heading {
      color: var(--ink);
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }

    .settings-panel {
      display: none;
      overflow: auto;
      padding: 18px 18px 20px;
    }

    .settings-panel.is-active {
      display: flex;
    }

    @media (max-width: 560px) {
      .settings-dialog-form {
        grid-template-columns: 1fr;
        max-height: 90vh;
      }

      .settings-nav {
        border-bottom: 1px solid var(--line);
        border-right: none;
        flex-direction: row;
        gap: 4px;
        overflow-x: auto;
        padding: 10px;
      }

      .settings-nav-title {
        display: none;
      }

      .settings-nav-list {
        flex-direction: row;
      }

      .settings-nav-item {
        white-space: nowrap;
      }
    }

    .settings-toggle {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 13px;
      gap: 8px;
      user-select: none;
    }

    .settings-toggle input[type="checkbox"] {
      accent-color: var(--accent, #0c66e4);
      cursor: pointer;
      height: 16px;
      width: 16px;
    }

    .settings-toggle-label {
      color: var(--ink);
      font-weight: 500;
    }

    .theme-choices {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(3, 1fr);
    }

    .theme-choice {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      gap: 6px;
      padding: 14px 10px;
      text-align: center;
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
    }

    .theme-choice:hover {
      background: rgba(var(--ink-rgb), 0.04);
    }

    .theme-choice input[type="radio"] {
      display: none;
    }

    .theme-choice .lucide-icon {
      color: var(--muted);
    }

    .theme-choice:has(input:checked) {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent);
    }

    .theme-choice:has(input:checked) .lucide-icon {
      color: var(--accent);
    }

    .context-menu {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(var(--ink-rgb), 0.16), 0 0 1px rgba(var(--ink-rgb), 0.18);
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 200px;
      padding: 4px;
      position: fixed;
      z-index: 1000;
    }

    .context-menu[hidden] {
      display: none;
    }

    .context-menu-item {
      align-items: center;
      background: transparent;
      border: none;
      border-radius: 5px;
      color: var(--ink);
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-size: 13px;
      gap: 8px;
      padding: 6px 10px;
      text-align: left;
      transition: background-color 100ms ease, color 100ms ease;
      width: 100%;
    }

    .context-menu-item:hover,
    .context-menu-item:focus-visible {
      background: rgba(15, 15, 15, 0.06);
      outline: none;
    }

    .context-menu-item .lucide-icon {
      color: var(--muted);
      flex: 0 0 auto;
      height: 14px;
      width: 14px;
    }

    .context-menu-item-danger {
      color: #b91c1c;
    }

    .context-menu-item-danger:hover,
    .context-menu-item-danger:focus-visible {
      background: rgba(220, 38, 38, 0.08);
    }

    .context-menu-item-danger .lucide-icon {
      color: #b91c1c;
    }

    .context-menu-divider {
      background: var(--line);
      height: 1px;
      margin: 3px 4px;
    }

    .raw-dialog {
      max-width: min(720px, 92vw);
    }

    .raw-content {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      font-size: 12px;
      max-height: 70vh;
      min-height: 360px;
      white-space: pre;
    }

    .column-foot {
      padding: 4px 8px 8px;
    }

    .add-card {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 13px;
      font-weight: 500;
      gap: 6px;
      height: 32px;
      justify-content: flex-start;
      padding: 0 8px;
      text-align: left;
      width: 100%;
    }

    .add-card .lucide-icon,
    .add-column .lucide-icon,
    .ghost .lucide-icon {
      height: 15px;
      width: 15px;
    }

    .add-card:hover {
      background: rgba(var(--ink-rgb), 0.08);
      color: var(--ink);
    }

    .empty {
      background: transparent;
      border: 1px dashed transparent;
      border-radius: var(--radius);
      color: var(--muted);
      cursor: pointer;
      display: block;
      font: inherit;
      font-size: 12px;
      height: auto;
      padding: 14px 8px;
      text-align: center;
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
      width: 100%;
    }

    .empty:hover {
      background: rgba(var(--ink-rgb), 0.04);
      border-color: var(--line-strong);
      color: var(--ink-soft);
    }

    .add-column {
      align-items: center;
      align-self: flex-start;
      background: rgba(var(--ink-rgb), 0.06);
      border-radius: var(--radius-lg);
      color: var(--ink-soft);
      display: inline-flex;
      flex: 0 0 320px;
      font-size: 13px;
      font-weight: 500;
      gap: 6px;
      height: 40px;
      justify-content: flex-start;
      max-width: 320px;
      min-width: 320px;
      padding: 0 12px;
      transition: background-color 120ms ease;
      width: 320px;
    }

    .add-column:hover {
      background: rgba(var(--ink-rgb), 0.12);
      color: var(--ink);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 720px) {
      :root {
        --topbar-height: 48px;
      }

      .topbar {
        padding: 0 12px;
      }

      .board-title {
        font-size: 14px;
      }

      .board {
        gap: 8px;
        padding: 12px;
        scroll-padding: 12px;
      }

      .column,
      .add-column {
        flex-basis: min(82vw, 300px);
        max-width: min(82vw, 300px);
        min-width: min(82vw, 300px);
        width: min(82vw, 300px);
      }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">kanban-cli</span>
        ${
          (options.boards ?? []).length > 1
            ? `<select id="boardSwitcher" class="board-switcher" aria-label="Switch board">
              ${(options.boards ?? [])
                .map(
                  (b) =>
                    `<option value="${escapeHtml(b.id)}"${b.id === (options.activeBoardId ?? "") ? " selected" : ""}>${escapeHtml(b.fileName)}</option>`
                )
                .join("")}
            </select>`
            : ""
        }
        <input id="boardTitle" class="board-title" type="text" aria-label="Board title" autocomplete="off" spellcheck="false">
      </div>
      <button id="copyPromptBtn" class="ghost copy-prompt-btn" type="button" title="Copy a prompt to start implementing the Todo column">
        ${browserIcons.play}<span>Copy prompt to start implementing</span>
      </button>
      <div class="top-actions">
        <button id="themeButton" class="theme-button" type="button" aria-label="Board theme color" title="Board theme color">
          <span class="theme-swatch" id="themeSwatch">${browserIcons.palette}</span>
        </button>
        <span id="status" class="status"><span id="statusIcon" class="status-icon">${browserIcons.statusSaving}</span><span id="statusText">Loading</span></span>
        <button id="copyBoardLink" class="ghost icon-button" type="button" aria-label="Copy file path" title="Copy file path">${browserIcons.link}</button>
        <button id="themeToggle" class="ghost icon-button" type="button" aria-label="Toggle dark mode" title="Toggle dark mode" data-theme-toggle>${browserIcons.moon}</button>
        <button id="settingsButton" class="ghost icon-button" type="button" aria-label="Board settings" title="Board settings">${browserIcons.settings}</button>
        <button id="reload" class="ghost icon-button" type="button" aria-label="Reload" title="Reload">${browserIcons.reload}</button>
      </div>
    </header>
    <main class="board-wrap">
      <div id="board" class="board" aria-live="polite"></div>
    </main>
  </div>
  <dialog id="rawDialog" class="card-dialog raw-dialog" aria-labelledby="rawDialogTitle">
    <form method="dialog" class="card-dialog-form">
      <header class="card-dialog-head">
        <h2 id="rawDialogTitle" class="card-dialog-heading">Raw markdown</h2>
        <button type="submit" class="icon-button" aria-label="Close" title="Close">${browserIcons.close}</button>
      </header>
      <textarea id="rawContent" class="card-dialog-description raw-content" readonly aria-label="Raw markdown content"></textarea>
    </form>
  </dialog>
  <dialog id="settingsDialog" class="card-dialog settings-dialog" aria-labelledby="settingsDialogTitle">
    <form method="dialog" class="card-dialog-form settings-dialog-form">
      <aside class="settings-nav" aria-label="Settings sections">
        <h2 id="settingsDialogTitle" class="settings-nav-title">Settings</h2>
        <nav class="settings-nav-list">
          <button type="button" class="settings-nav-item is-active" data-settings-tab="instructions">${browserIcons.alignLeft}<span>Instructions</span></button>
          <button type="button" class="settings-nav-item" data-settings-tab="appearance">${browserIcons.moon}<span>Appearance</span></button>
          <button type="button" class="settings-nav-item" data-settings-tab="markdown">${browserIcons.eye}<span>Markdown</span></button>
          <button type="button" class="settings-nav-item" data-settings-tab="sounds">${browserIcons.volume}<span>Sounds</span></button>
          <button type="button" class="settings-nav-item" data-settings-tab="about">${browserIcons.info}<span>About</span></button>
        </nav>
      </aside>
      <div class="settings-main">
        <header class="settings-main-head">
          <h3 class="settings-main-heading" data-settings-heading>Instructions</h3>
          <button type="submit" class="icon-button" aria-label="Close" title="Close">${browserIcons.close}</button>
        </header>
        <section class="settings-section settings-panel is-active" data-settings-panel="instructions">
          <p class="settings-section-help">Written at the top of the markdown file. Clear the text to disable.</p>
          <textarea id="settingsInstructions" class="card-dialog-description" placeholder="Add board-level instructions" aria-label="Board instructions"></textarea>
          <div class="settings-actions">
            <button type="button" class="ghost" id="settingsResetInstructions">Use default</button>
            <button type="button" class="ghost" id="settingsClearInstructions">Clear</button>
          </div>
        </section>
        <section class="settings-section settings-panel" data-settings-panel="appearance">
          <p class="settings-section-help">Choose how the board looks. Auto matches your operating system.</p>
          <div class="theme-choices" role="radiogroup" aria-label="Theme mode">
            <label class="theme-choice">
              <input type="radio" name="settings-theme-mode" value="auto" />
              ${browserIcons.monitor}
              <span>Auto</span>
            </label>
            <label class="theme-choice">
              <input type="radio" name="settings-theme-mode" value="light" />
              ${browserIcons.sun}
              <span>Light</span>
            </label>
            <label class="theme-choice">
              <input type="radio" name="settings-theme-mode" value="dark" />
              ${browserIcons.moon}
              <span>Dark</span>
            </label>
          </div>
        </section>
        <section class="settings-section settings-panel" data-settings-panel="markdown">
          <p class="settings-section-help">Inspect the file contents on disk.</p>
          <div class="settings-actions" style="justify-content: flex-start">
            <button type="button" class="ghost" id="settingsViewRaw">View raw markdown</button>
          </div>
        </section>
        <section class="settings-section settings-panel" data-settings-panel="sounds">
          <p class="settings-section-help">Play a small sound when a card moves into Doing or Done. Off by default.</p>
          <label class="settings-toggle">
            <input type="checkbox" id="settingsSoundsToggle" />
            <span class="settings-toggle-label">Enable move sounds</span>
          </label>
          <div class="settings-actions" style="justify-content: flex-start">
            <button type="button" class="ghost" id="settingsSoundsPreviewDoing">Preview Doing</button>
            <button type="button" class="ghost" id="settingsSoundsPreviewDone">Preview Done</button>
          </div>
        </section>
        <section class="settings-section settings-panel" data-settings-panel="about">
          <p class="settings-section-help">kanban-cli is open source. Star the repo or visit the site for docs.</p>
          <div class="settings-links">
            <a class="settings-link" href="https://github.com/Vochsel/kanban-cli" target="_blank" rel="noopener noreferrer">
              ${browserIcons.github}
              <span class="settings-link-label">GitHub repository</span>
              <span class="settings-link-host">github.com/Vochsel/kanban-cli</span>
              ${browserIcons.externalLink}
            </a>
            <a class="settings-link" href="https://kanban-cli.vochsel.com" target="_blank" rel="noopener noreferrer">
              ${browserIcons.globe}
              <span class="settings-link-label">Website</span>
              <span class="settings-link-host">kanban-cli.vochsel.com</span>
              ${browserIcons.externalLink}
            </a>
          </div>
        </section>
      </div>
    </form>
  </dialog>
  <dialog id="cardDialog" class="card-dialog" aria-labelledby="cardDialogTitle">
    <form method="dialog" class="card-dialog-form">
      <header class="card-dialog-head">
        <textarea id="cardDialogTitle" class="card-dialog-title" rows="1" aria-label="Card title" autocomplete="off" spellcheck="false"></textarea>
        <button type="submit" class="icon-button" id="cardDialogClose" aria-label="Close" title="Close">${browserIcons.close}</button>
      </header>
      <div class="card-dialog-section">
        <label class="card-dialog-label" for="cardDialogDescription">${browserIcons.alignLeft}<span>Description</span></label>
        <textarea id="cardDialogDescription" class="card-dialog-description" placeholder="Add a more detailed description" aria-label="Card description"></textarea>
      </div>
    </form>
  </dialog>
  <div id="cardContextMenu" class="context-menu" role="menu" aria-hidden="true" hidden>
    <button type="button" class="context-menu-item" data-context-action="edit" role="menuitem">${browserIcons.alignLeft}<span>Edit description</span></button>
    <button type="button" class="context-menu-item" data-context-action="copy-text" role="menuitem">${browserIcons.copy}<span>Copy text</span></button>
    <button type="button" class="context-menu-item" data-context-action="copy-link" role="menuitem">${browserIcons.link}<span>Copy link</span></button>
    <div class="context-menu-divider" role="separator"></div>
    <button type="button" class="context-menu-item context-menu-item-danger" data-context-action="delete" role="menuitem">${browserIcons.trash}<span>Delete card</span></button>
  </div>
  <script>
    const state = {
      board: { columns: [] },
      fileName: ${JSON.stringify(options.fileName)},
      filePath: ${JSON.stringify(options.filePath)},
      fileVersion: null,
      dragType: null,
      isDirty: false,
      isSaving: false,
      saveTimer: null,
      saveToken: 0,
      iconPopover: null,
      themePopover: null,
      dialogCardId: null,
      pendingDeeplink: location.hash || null,
      activeBoardId: ${JSON.stringify(options.activeBoardId ?? null)},
      boards: ${JSON.stringify(options.boards ?? [])}
    };

    function boardQuery() {
      return state.activeBoardId ? "?board=" + encodeURIComponent(state.activeBoardId) : "";
    }

    const icons = ${JSON.stringify(browserIcons)};
    const columnIcons = ${JSON.stringify(columnIconMap)};
    const columnIconCatalog = ${JSON.stringify(columnIconCatalog)};
    const themePresets = ${JSON.stringify(themePresets)};
    const DEFAULT_ACCENT = "#0c66e4";

    const boardEl = document.querySelector("#board");
    const boardTitleEl = document.querySelector("#boardTitle");
    const themeButtonEl = document.querySelector("#themeButton");
    const themeSwatchEl = document.querySelector("#themeSwatch");
    const cardDialogEl = document.querySelector("#cardDialog");
    const cardDialogTitleEl = document.querySelector("#cardDialogTitle");
    const cardDialogDescriptionEl = document.querySelector("#cardDialogDescription");
    const settingsDialogEl = document.querySelector("#settingsDialog");
    const settingsInstructionsEl = document.querySelector("#settingsInstructions");
    const settingsButtonEl = document.querySelector("#settingsButton");
    const settingsResetEl = document.querySelector("#settingsResetInstructions");
    const settingsClearEl = document.querySelector("#settingsClearInstructions");
    const settingsViewRawEl = document.querySelector("#settingsViewRaw");
    const rawDialogEl = document.querySelector("#rawDialog");
    const rawContentEl = document.querySelector("#rawContent");
    const DEFAULT_INSTRUCTIONS = ${JSON.stringify(DEFAULT_INSTRUCTIONS)};
    const statusEl = document.querySelector("#status");
    const statusIconEl = document.querySelector("#statusIcon");
    const statusTextEl = document.querySelector("#statusText");

    document.querySelector("#reload").addEventListener("click", () => loadBoard("manual"));

    const boardSwitcherEl = document.querySelector("#boardSwitcher");
    if (boardSwitcherEl) {
      boardSwitcherEl.addEventListener("change", () => {
        const next = boardSwitcherEl.value;
        if (!next || next === state.activeBoardId) return;
        state.activeBoardId = next;
        const entry = (state.boards || []).find((b) => b.id === next);
        if (entry) {
          state.fileName = entry.fileName;
          state.filePath = entry.filePath;
        }
        state.fileVersion = null;
        state.isDirty = false;
        loadBoard("switch");
      });
    }
    document.querySelector("#copyBoardLink").addEventListener("click", (event) => {
      copyDeeplink(event.currentTarget, state.filePath, "File path copied");
    });

    document.querySelector("#copyPromptBtn").addEventListener("click", (event) => {
      const parts = [];
      const instructions = (state.board.instructions ?? "").trim();
      if (instructions) parts.push(instructions);
      parts.push("Work through every item in the Todo column one at a time, moving each into Doing before starting and to the top of Done when finished. Keep going to the next Todo item without stopping; only stop when the Todo column is empty.");
      parts.push("Board file: " + state.filePath);
      copyDeeplink(event.currentTarget, parts.join("\\n\\n"), "Prompt copied");
    });

    boardTitleEl.addEventListener("input", () => {
      state.board.title = boardTitleEl.value.trim() || undefined;
      scheduleSave();
    });

    boardTitleEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        boardTitleEl.blur();
      }
    });

    boardTitleEl.addEventListener("blur", () => {
      const trimmed = boardTitleEl.value.trim();
      boardTitleEl.value = trimmed;
      state.board.title = trimmed || undefined;
      updateDocumentTitle();
    });

    themeButtonEl.addEventListener("click", () => toggleThemePopover());

    boardEl.addEventListener("click", (event) => {
      const button = event.target.closest("button");

      if (!button) {
        const cardEl = event.target.closest(".card");
        if (cardEl && !event.target.closest("input, textarea, label, button")) {
          openCardDialog(cardEl.dataset.cardId);
        }
        return;
      }

      if (button.matches(".add-column")) {
        addColumn();
        return;
      }

      const columnEl = button.closest(".column");
      const cardEl = button.closest(".card");

      if ((button.matches(".add-card") || button.matches(".add-card-empty")) && columnEl) {
        addCard(columnEl.dataset.columnId);
        return;
      }

      if (button.matches(".delete-column") && columnEl) {
        deleteColumn(columnEl.dataset.columnId);
        return;
      }

      if (button.matches(".delete-card") && columnEl && cardEl) {
        deleteCard(columnEl.dataset.columnId, cardEl.dataset.cardId);
        return;
      }

      if (button.matches(".column-icon-btn") && columnEl) {
        toggleIconPopover(button, columnEl.dataset.columnId);
        return;
      }

      if (button.matches(".copy-column-link") && columnEl) {
        copyDeeplink(button, buildDeeplinkUrl("#column=" + columnEl.dataset.columnId), "Column link copied");
        return;
      }

      if (button.matches(".copy-card-link") && cardEl) {
        copyDeeplink(button, buildDeeplinkUrl("#card=" + cardEl.dataset.cardId), "Card link copied");
      }
    });

    boardEl.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("input, textarea, button")) return;
      const cardEl = event.target.closest(".card");
      if (!cardEl) return;
      event.preventDefault();
      openCardDialog(cardEl.dataset.cardId);
    });

    boardEl.addEventListener("input", (event) => {
      const target = event.target;
      if (target.matches(".card-title")) {
        growTextarea(target);
      }
      syncStateFromDom();
      scheduleSave();
    });

    boardEl.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      if (event.shiftKey) return;
      const target = event.target;
      if (target.matches(".column-title") || target.matches(".card-title")) {
        event.preventDefault();
        target.blur();
      }
    });

    boardEl.addEventListener("change", (event) => {
      if (!event.target.matches(".card-check")) return;
      syncStateFromDom();
      scheduleSave();
      event.target.closest(".card").classList.toggle("is-done", event.target.checked);
    });

    boardEl.addEventListener("blur", (event) => {
      const target = event.target;
      if (!target.matches(".column-title, .card-title")) return;

      if (!target.value.trim()) {
        target.value = "Untitled";
        syncStateFromDom();
        scheduleSave();
      }
    }, true);

    boardEl.addEventListener("mousedown", (event) => {
      const cardEl = event.target.closest(".card");
      if (!cardEl) return;
      const interactive = event.target.closest("button, input, textarea, label, select, a");
      cardEl.draggable = !interactive;
    });

    const contextMenuEl = document.querySelector("#cardContextMenu");
    let contextMenuCardId = null;

    function openContextMenu(cardId, x, y) {
      contextMenuCardId = cardId;
      contextMenuEl.hidden = false;
      contextMenuEl.setAttribute("aria-hidden", "false");
      // Measure to clamp inside viewport.
      contextMenuEl.style.left = "0px";
      contextMenuEl.style.top = "0px";
      const menuRect = contextMenuEl.getBoundingClientRect();
      const maxX = window.innerWidth - menuRect.width - 8;
      const maxY = window.innerHeight - menuRect.height - 8;
      contextMenuEl.style.left = Math.max(8, Math.min(x, maxX)) + "px";
      contextMenuEl.style.top = Math.max(8, Math.min(y, maxY)) + "px";
    }

    function closeContextMenu() {
      contextMenuEl.hidden = true;
      contextMenuEl.setAttribute("aria-hidden", "true");
      contextMenuCardId = null;
    }

    boardEl.addEventListener("contextmenu", (event) => {
      const cardEl = event.target.closest(".card");
      if (!cardEl) return;
      event.preventDefault();
      openContextMenu(cardEl.dataset.cardId, event.clientX, event.clientY);
    });

    contextMenuEl.addEventListener("click", (event) => {
      const item = event.target.closest("[data-context-action]");
      if (!item) return;
      const action = item.dataset.contextAction;
      const cardId = contextMenuCardId;
      closeContextMenu();
      if (!cardId) return;
      const card = findCard(cardId);
      if (!card) return;
      const column = state.board.columns.find((c) => c.cards.some((x) => x.id === cardId));
      if (action === "edit") {
        openCardDialog(cardId);
      } else if (action === "copy-text") {
        const parts = [card.title || ""];
        if ((card.description ?? "").trim()) parts.push("", card.description.trim());
        copyText(parts.join("\\n"), "Card text copied");
      } else if (action === "copy-link") {
        copyText(buildDeeplinkUrl("#card=" + cardId), "Card link copied");
      } else if (action === "delete") {
        if (column) deleteCard(column.id, cardId);
      }
    });

    document.addEventListener("click", (event) => {
      if (contextMenuEl.hidden) return;
      if (event.target.closest("#cardContextMenu")) return;
      closeContextMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !contextMenuEl.hidden) {
        closeContextMenu();
      }
    });

    window.addEventListener("scroll", closeContextMenu, true);
    window.addEventListener("blur", closeContextMenu);
    window.addEventListener("resize", closeContextMenu);

    boardEl.addEventListener("dragstart", (event) => {
      const columnHandle = event.target.closest(".column-grip");

      if (columnHandle) {
        const columnEl = columnHandle.closest(".column");
        state.dragType = "column";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", columnEl.dataset.columnId);
        requestAnimationFrame(() => columnEl.classList.add("column-dragging"));
        return;
      }

      if (event.target.classList && event.target.classList.contains("card")) {
        const cardEl = event.target;
        state.dragType = "card";
        const sourceColumnEl = cardEl.closest(".column");
        state.dragSnapshot = {
          cardId: cardEl.dataset.cardId,
          sourceColumnId: sourceColumnEl ? sourceColumnEl.dataset.columnId : null
        };
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", cardEl.dataset.cardId);
        requestAnimationFrame(() => cardEl.classList.add("card-dragging"));
      }
    });

    boardEl.addEventListener("dragover", (event) => {
      if (state.dragType === "card") {
        const dragging = boardEl.querySelector(".card-dragging");
        if (!dragging) return;
        const columnEl = event.target.closest(".column");
        const list = columnEl ? columnEl.querySelector(".cards") : event.target.closest(".cards");
        if (!list) return;

        event.preventDefault();
        list.querySelector(".empty")?.remove();
        const after = getAfterElement(list, ".card:not(.card-dragging)", event.clientY, "vertical");
        if (!after) {
          list.appendChild(dragging);
        } else {
          list.insertBefore(dragging, after);
        }
      }

      if (state.dragType === "column") {
        const dragging = boardEl.querySelector(".column-dragging");
        if (!dragging) return;

        event.preventDefault();
        const after = getAfterElement(boardEl, ".column:not(.column-dragging)", event.clientX, "horizontal");
        const addColumnTile = boardEl.querySelector(".add-column");
        if (!after) {
          if (addColumnTile) {
            boardEl.insertBefore(dragging, addColumnTile);
          } else {
            boardEl.appendChild(dragging);
          }
        } else {
          boardEl.insertBefore(dragging, after);
        }
      }
    });

    boardEl.addEventListener("drop", (event) => {
      if (state.dragType) event.preventDefault();
    });

    boardEl.addEventListener("dragend", () => {
      const changed = Boolean(state.dragType);
      const wasCardDrag = state.dragType === "card";
      const snapshot = state.dragSnapshot;
      state.dragSnapshot = null;
      boardEl.querySelectorAll(".card-dragging, .column-dragging").forEach((el) => {
        el.classList.remove("card-dragging", "column-dragging");
      });
      state.dragType = null;

      if (changed) {
        syncStateFromDom();
        renderBoard();
        saveNow();

        if (wasCardDrag && snapshot && snapshot.cardId) {
          const newColumn = state.board.columns.find((c) => c.cards.some((card) => card.id === snapshot.cardId));
          if (newColumn && newColumn.id !== snapshot.sourceColumnId) {
            const title = (newColumn.title || "").trim().toLowerCase();
            if (title === "doing") playMoveDoingSound();
            else if (title === "done") playMoveDoneSound();
          }
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (state.iconPopover &&
          !state.iconPopover.element.contains(event.target) &&
          !state.iconPopover.button.contains(event.target)) {
        closeIconPopover();
      }
      if (state.themePopover &&
          !state.themePopover.element.contains(event.target) &&
          !state.themePopover.button.contains(event.target)) {
        closeThemePopover();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (state.iconPopover) closeIconPopover();
        if (state.themePopover) closeThemePopover();
      }
    });

    window.addEventListener("resize", () => {
      if (state.iconPopover) closeIconPopover();
      if (state.themePopover) closeThemePopover();
    });

    async function loadBoard(reason) {
      if (reason === "external" && state.isDirty) {
        setStatus("File changed on disk", "saving");
        return;
      }

      setStatus("Loading", "saving");

      try {
        const response = await fetch("/api/board" + boardQuery(), { headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();
        state.board = payload.board;
        state.fileVersion = payload.version;
        state.fileName = payload.fileName;
        state.isDirty = false;
        state.isSaving = false;
        applyBoardChrome();
        renderBoard();
        setStatus(reason === "external" ? "Reloaded from disk" : "Saved", "saved");
      } catch (error) {
        console.error(error);
        setStatus("Load failed", "error");
      }
    }

    async function checkDiskChanges() {
      if (!state.fileVersion || state.isDirty || state.isSaving || state.dragType) {
        return;
      }

      try {
        const response = await fetch("/api/board" + boardQuery(), { headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();

        if (payload.version && payload.version !== state.fileVersion) {
          state.board = payload.board;
          state.fileVersion = payload.version;
          state.fileName = payload.fileName;
          applyBoardChrome();
          renderBoard();
          setStatus("Reloaded from disk", "saved");
        }
      } catch (error) {
        console.error(error);
        setStatus("Sync failed", "error");
      }
    }

    function applyBoardChrome() {
      boardTitleEl.value = state.board.title ?? "";
      boardTitleEl.placeholder = state.fileName;
      const theme = state.board.theme ?? DEFAULT_ACCENT;
      applyTheme(theme);
      updateDocumentTitle();
    }

    function updateDocumentTitle() {
      const display = (state.board.title && state.board.title.trim()) || state.fileName;
      document.title = display + " - kanban-cli";
    }

    function applyTheme(color) {
      const root = document.documentElement.style;
      const hex = normalizeHex(color);
      if (!hex) {
        root.removeProperty("--accent");
        root.removeProperty("--accent-strong");
        root.removeProperty("--accent-soft");
        root.removeProperty("--bg");
        root.removeProperty("--column-bg");
        root.removeProperty("--column-bg-hover");
        themeSwatchEl.style.removeProperty("background");
        return;
      }
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const strong = darken(r, g, b, 0.7);
      root.setProperty("--accent", hex);
      root.setProperty("--accent-strong", strong);
      root.setProperty("--accent-soft", "rgba(" + r + ", " + g + ", " + b + ", 0.12)");
      root.setProperty("--bg", tint(r, g, b, 0.06));
      root.setProperty("--column-bg", tint(r, g, b, 0.14));
      root.setProperty("--column-bg-hover", tint(r, g, b, 0.2));
      themeSwatchEl.style.background = hex;
    }

    function tint(r, g, b, alpha) {
      const tr = Math.round(255 - (255 - r) * alpha);
      const tg = Math.round(255 - (255 - g) * alpha);
      const tb = Math.round(255 - (255 - b) * alpha);
      const hex = (v) => v.toString(16).padStart(2, "0");
      return "#" + hex(tr) + hex(tg) + hex(tb);
    }

    function normalizeHex(value) {
      if (typeof value !== "string") return null;
      const trimmed = value.trim().toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(trimmed)) return trimmed;
      if (/^#[0-9a-f]{3}$/.test(trimmed)) {
        return "#" + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2] + trimmed[3] + trimmed[3];
      }
      return null;
    }

    function darken(r, g, b, factor) {
      const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * factor)));
      const hex = (v) => v.toString(16).padStart(2, "0");
      return "#" + hex(clamp(r)) + hex(clamp(g)) + hex(clamp(b));
    }

    function renderBoard() {
      closeIconPopover();
      boardEl.innerHTML = "";

      for (const column of state.board.columns) {
        boardEl.appendChild(renderColumn(column));
      }

      const addColumnBtn = button("Add column", "add-column", "Add column", "plus");
      boardEl.appendChild(addColumnBtn);

      boardEl.querySelectorAll(".card-title").forEach(growTextarea);

      if (state.pendingDeeplink) {
        requestAnimationFrame(applyPendingDeeplink);
      }
    }

    function renderColumn(column) {
      const columnEl = document.createElement("section");
      columnEl.className = "column";
      columnEl.dataset.columnId = column.id;

      const head = document.createElement("div");
      head.className = "column-head";

      const grip = button("", "column-grip", "Drag column", "grip");
      grip.draggable = true;

      const iconBtn = document.createElement("button");
      iconBtn.type = "button";
      const hasIcon = Boolean(column.icon && columnIcons[column.icon]);
      iconBtn.className = hasIcon ? "icon-button column-icon-btn has-icon" : "icon-button column-icon-btn";
      iconBtn.setAttribute("aria-label", "Column icon");
      iconBtn.title = "Set column icon";
      iconBtn.dataset.columnIconBtn = "1";
      iconBtn.innerHTML = hasIcon ? columnIcons[column.icon] : columnIcons.list;
      if (!hasIcon) iconBtn.style.opacity = "";

      const title = document.createElement("input");
      title.className = "column-title";
      title.value = column.title;
      title.setAttribute("aria-label", "Column title");

      const link = button("", "icon-button copy-link copy-column-link", "Copy link to column", "link");
      const remove = button("", "icon-button delete-column", "Delete column", "trash");

      head.append(grip, iconBtn, title, link, remove);

      const cards = document.createElement("div");
      cards.className = "cards";
      cards.dataset.columnId = column.id;

      if (column.cards.length === 0) {
        const empty = document.createElement("button");
        empty.type = "button";
        empty.className = "empty add-card-empty";
        empty.textContent = "Drop cards here";
        empty.setAttribute("aria-label", "Add card");
        cards.appendChild(empty);
      } else {
        for (const card of column.cards) {
          cards.appendChild(renderCard(card));
        }
      }

      const foot = document.createElement("div");
      foot.className = "column-foot";
      foot.appendChild(button("Add card", "add-card", "Add card", "plus"));

      columnEl.append(head, cards, foot);
      return columnEl;
    }

    function renderCard(card) {
      const cardEl = document.createElement("article");
      cardEl.className = card.done ? "card is-done" : "card";
      cardEl.dataset.cardId = card.id;
      cardEl.setAttribute("role", "button");
      cardEl.setAttribute("aria-label", "Open card");
      cardEl.tabIndex = 0;

      const top = document.createElement("div");
      top.className = "card-top";

      const check = document.createElement("input");
      check.className = "card-check";
      check.type = "checkbox";
      check.checked = card.done;
      check.setAttribute("aria-label", "Done");

      const title = document.createElement("textarea");
      title.className = "card-title";
      title.value = card.title;
      title.rows = 1;
      title.setAttribute("aria-label", "Card title");

      const remove = button("", "icon-button delete-card", "Delete card", "trash");

      top.append(check, title, remove);
      cardEl.append(top);

      if ((card.description ?? "").trim()) {
        const indicator = document.createElement("span");
        indicator.className = "card-desc-indicator";
        indicator.title = "Has description";
        indicator.setAttribute("aria-label", "Has description");
        indicator.innerHTML = icons.alignLeft;
        cardEl.append(indicator);
      }

      return cardEl;
    }

    function toggleIconPopover(buttonEl, columnId) {
      if (state.iconPopover && state.iconPopover.columnId === columnId) {
        closeIconPopover();
        return;
      }
      closeIconPopover();
      openIconPopover(buttonEl, columnId);
    }

    function openIconPopover(buttonEl, columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      const popover = document.createElement("div");
      popover.className = "icon-popover";
      popover.setAttribute("role", "dialog");
      popover.setAttribute("aria-label", "Pick column icon");

      const search = document.createElement("input");
      search.type = "search";
      search.className = "icon-popover-search";
      search.placeholder = "Search icons";
      search.setAttribute("aria-label", "Search icons");
      popover.appendChild(search);

      const grid = document.createElement("div");
      grid.className = "icon-popover-grid";
      popover.appendChild(grid);

      const empty = document.createElement("div");
      empty.className = "icon-popover-empty";
      empty.textContent = "No matches";
      empty.style.display = "none";
      popover.appendChild(empty);

      const choices = [];
      for (const entry of columnIconCatalog) {
        const choice = document.createElement("button");
        choice.type = "button";
        choice.className = column.icon === entry.name ? "icon-choice is-active" : "icon-choice";
        choice.title = entry.label;
        choice.setAttribute("aria-label", entry.label);
        choice.dataset.search = (entry.label + " " + entry.name).toLowerCase();
        choice.innerHTML = columnIcons[entry.name];
        choice.addEventListener("click", () => {
          column.icon = entry.name;
          closeIconPopover();
          renderBoard();
          saveNow();
        });
        grid.appendChild(choice);
        choices.push(choice);
      }

      search.addEventListener("input", () => {
        const q = search.value.trim().toLowerCase();
        let visible = 0;
        for (const choice of choices) {
          const matches = !q || choice.dataset.search.indexOf(q) !== -1;
          choice.style.display = matches ? "" : "none";
          if (matches) visible += 1;
        }
        empty.style.display = visible === 0 ? "" : "none";
      });

      search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const firstVisible = choices.find((c) => c.style.display !== "none");
          if (firstVisible) firstVisible.click();
        }
      });

      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "icon-choice icon-popover-clear";
      clear.textContent = "No icon";
      clear.addEventListener("click", () => {
        delete column.icon;
        closeIconPopover();
        renderBoard();
        saveNow();
      });
      popover.appendChild(clear);

      document.body.appendChild(popover);
      const rect = buttonEl.getBoundingClientRect();
      const popWidth = popover.offsetWidth;
      const popHeight = popover.offsetHeight;
      let left = rect.left;
      if (left + popWidth > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - popWidth - 8);
      }
      let top = rect.bottom + 4;
      if (top + popHeight > window.innerHeight - 8) {
        top = Math.max(8, rect.top - popHeight - 4);
      }
      popover.style.left = left + "px";
      popover.style.top = top + "px";

      buttonEl.classList.add("is-open");
      state.iconPopover = { element: popover, button: buttonEl, columnId };
      requestAnimationFrame(() => search.focus());
    }

    function closeIconPopover() {
      if (!state.iconPopover) return;
      state.iconPopover.button.classList.remove("is-open");
      state.iconPopover.element.remove();
      state.iconPopover = null;
    }

    function toggleThemePopover() {
      if (state.themePopover) {
        closeThemePopover();
        return;
      }
      openThemePopover();
    }

    function openThemePopover() {
      const current = (state.board.theme ?? DEFAULT_ACCENT).toLowerCase();
      const popover = document.createElement("div");
      popover.className = "theme-popover";
      popover.setAttribute("role", "dialog");
      popover.setAttribute("aria-label", "Pick board theme color");

      for (const preset of themePresets) {
        const choice = document.createElement("button");
        choice.type = "button";
        choice.className = preset.value.toLowerCase() === current ? "theme-choice is-active" : "theme-choice";
        choice.style.background = preset.value;
        choice.title = preset.label;
        choice.setAttribute("aria-label", preset.label);
        choice.addEventListener("click", () => {
          const value = preset.value.toLowerCase();
          state.board.theme = value === DEFAULT_ACCENT ? undefined : value;
          applyTheme(value);
          closeThemePopover();
          saveNow();
        });
        popover.appendChild(choice);
      }

      document.body.appendChild(popover);
      const rect = themeButtonEl.getBoundingClientRect();
      const popWidth = popover.offsetWidth;
      const popHeight = popover.offsetHeight;
      let left = rect.left;
      if (left + popWidth > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - popWidth - 8);
      }
      let top = rect.bottom + 4;
      if (top + popHeight > window.innerHeight - 8) {
        top = Math.max(8, rect.top - popHeight - 4);
      }
      popover.style.left = left + "px";
      popover.style.top = top + "px";

      themeButtonEl.classList.add("is-open");
      state.themePopover = { element: popover, button: themeButtonEl };
    }

    function closeThemePopover() {
      if (!state.themePopover) return;
      state.themePopover.button.classList.remove("is-open");
      state.themePopover.element.remove();
      state.themePopover = null;
    }

    function findCard(cardId) {
      for (const column of state.board.columns) {
        const card = column.cards.find((item) => item.id === cardId);
        if (card) return card;
      }
      return null;
    }

    function openCardDialog(cardId, options) {
      const card = findCard(cardId);
      if (!card) return;

      state.dialogCardId = cardId;
      cardDialogTitleEl.value = card.title;
      cardDialogDescriptionEl.value = card.description ?? "";

      if (typeof cardDialogEl.showModal === "function") {
        cardDialogEl.showModal();
      } else {
        cardDialogEl.setAttribute("open", "");
      }

      const focusTitle = Boolean(options && options.focusTitle);
      requestAnimationFrame(() => {
        growTextarea(cardDialogTitleEl);
        if (focusTitle) {
          cardDialogTitleEl.focus();
          cardDialogTitleEl.select();
        } else {
          cardDialogDescriptionEl.focus();
        }
      });
    }

    function closeCardDialog() {
      state.dialogCardId = null;
      if (cardDialogEl.open) {
        cardDialogEl.close();
      } else {
        cardDialogEl.removeAttribute("open");
      }
    }

    function syncDialogToCard() {
      const card = state.dialogCardId ? findCard(state.dialogCardId) : null;
      if (!card) return;
      const nextTitle = cardDialogTitleEl.value.trim() || "Untitled";
      const nextDescription = cardDialogDescriptionEl.value;
      card.title = nextTitle;
      card.description = nextDescription;

      const cardEl = boardEl.querySelector('[data-card-id="' + cssEscape(card.id) + '"]');
      if (cardEl) {
        const titleEl = cardEl.querySelector(".card-title");
        if (titleEl && titleEl.value !== nextTitle) {
          titleEl.value = nextTitle;
          growTextarea(titleEl);
        }
        const hasDesc = Boolean(nextDescription.trim());
        let indicator = cardEl.querySelector(".card-desc-indicator");
        if (hasDesc && !indicator) {
          indicator = document.createElement("span");
          indicator.className = "card-desc-indicator";
          indicator.title = "Has description";
          indicator.setAttribute("aria-label", "Has description");
          indicator.innerHTML = icons.alignLeft;
          cardEl.append(indicator);
        } else if (!hasDesc && indicator) {
          indicator.remove();
        }
      }
      scheduleSave();
    }

    cardDialogTitleEl.addEventListener("input", () => {
      growTextarea(cardDialogTitleEl);
      syncDialogToCard();
    });
    cardDialogDescriptionEl.addEventListener("input", syncDialogToCard);

    cardDialogTitleEl.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      if (event.shiftKey) return;
      event.preventDefault();
      cardDialogDescriptionEl.focus();
    });

    cardDialogEl.addEventListener("close", () => {
      state.dialogCardId = null;
    });

    cardDialogEl.addEventListener("click", (event) => {
      if (event.target === cardDialogEl) {
        closeCardDialog();
      }
    });

    settingsButtonEl.addEventListener("click", () => openSettingsDialog());

    const settingsTabButtons = document.querySelectorAll("[data-settings-tab]");
    const settingsPanels = document.querySelectorAll("[data-settings-panel]");
    const settingsHeading = document.querySelector("[data-settings-heading]");
    const settingsTabLabels = {
      instructions: "Instructions",
      markdown: "Markdown",
      sounds: "Sounds",
      about: "About"
    };
    settingsTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-settings-tab");
        if (!tab) return;
        settingsTabButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        settingsPanels.forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-settings-panel") === tab));
        if (settingsHeading) settingsHeading.textContent = settingsTabLabels[tab] || tab;
      });
    });

    const THEME_PREF_KEY = "kanban-cli:theme-mode";
    function getThemeMode() {
      try {
        const raw = window.localStorage?.getItem(THEME_PREF_KEY);
        if (raw === "light" || raw === "dark" || raw === "auto") return raw;
      } catch (_) { /* ignore */ }
      return "auto";
    }
    function resolvedTheme(mode) {
      if (mode === "light" || mode === "dark") return mode;
      try {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } catch (_) {
        return "light";
      }
    }
    function applyTheme(mode) {
      const resolved = resolvedTheme(mode);
      document.documentElement.setAttribute("data-theme", resolved);
      const themeToggleEl = document.querySelector("#themeToggle");
      if (themeToggleEl) {
        themeToggleEl.innerHTML = resolved === "dark" ? ${JSON.stringify(browserIcons.sun)} : ${JSON.stringify(browserIcons.moon)};
        themeToggleEl.setAttribute("aria-label", resolved === "dark" ? "Switch to light mode" : "Switch to dark mode");
        themeToggleEl.setAttribute("title", resolved === "dark" ? "Switch to light mode" : "Switch to dark mode");
      }
      // Update the radios in the appearance panel.
      document.querySelectorAll("input[name='settings-theme-mode']").forEach((input) => {
        input.checked = input.value === mode;
      });
    }
    function setThemeMode(mode) {
      try { window.localStorage?.setItem(THEME_PREF_KEY, mode); } catch (_) { /* ignore */ }
      applyTheme(mode);
    }
    applyTheme(getThemeMode());
    document.querySelector("#themeToggle").addEventListener("click", () => {
      // Header toggle is an explicit override: flip whatever is current.
      const current = resolvedTheme(getThemeMode());
      setThemeMode(current === "dark" ? "light" : "dark");
    });
    document.querySelectorAll("input[name='settings-theme-mode']").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) setThemeMode(input.value);
      });
    });
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onSystemChange = () => {
        if (getThemeMode() === "auto") applyTheme("auto");
      };
      if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
      else if (mq.addListener) mq.addListener(onSystemChange);
    } catch (_) { /* ignore */ }

    const SOUND_PREF_KEY = "kanban-cli:sounds-enabled";
    let soundsEnabled = false;
    try {
      soundsEnabled = window.localStorage?.getItem(SOUND_PREF_KEY) === "1";
    } catch (_) { /* localStorage unavailable */ }
    const soundsToggleEl = document.querySelector("#settingsSoundsToggle");
    soundsToggleEl.checked = soundsEnabled;
    soundsToggleEl.addEventListener("change", () => {
      soundsEnabled = soundsToggleEl.checked;
      try { window.localStorage?.setItem(SOUND_PREF_KEY, soundsEnabled ? "1" : "0"); } catch (_) { /* ignore */ }
    });

    let _audioCtx = null;
    function getAudioCtx() {
      if (!_audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) _audioCtx = new Ctx();
      }
      return _audioCtx;
    }

    function playTone(freq, duration, volume, type) {
      const ctx = getAudioCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(volume, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.04);
    }

    function playMoveDoingSound() {
      if (!soundsEnabled) return;
      playTone(560, 0.14, 0.08, "sine");
    }

    function playMoveDoneSound() {
      if (!soundsEnabled) return;
      // Two ascending tones — a check/success cue.
      playTone(660, 0.10, 0.08, "sine");
      setTimeout(() => playTone(990, 0.20, 0.10, "sine"), 90);
    }

    document.querySelector("#settingsSoundsPreviewDoing").addEventListener("click", () => {
      // Preview ignores the enabled flag so the user can hear before turning it on.
      playTone(560, 0.14, 0.08, "sine");
    });
    document.querySelector("#settingsSoundsPreviewDone").addEventListener("click", () => {
      playTone(660, 0.10, 0.08, "sine");
      setTimeout(() => playTone(990, 0.20, 0.10, "sine"), 90);
    });

    settingsInstructionsEl.addEventListener("input", () => {
      const value = settingsInstructionsEl.value.replace(/^\\s+|\\s+$/g, "");
      state.board.instructions = value || undefined;
      scheduleSave();
    });

    settingsResetEl.addEventListener("click", () => {
      settingsInstructionsEl.value = DEFAULT_INSTRUCTIONS;
      state.board.instructions = DEFAULT_INSTRUCTIONS;
      scheduleSave();
      settingsInstructionsEl.focus();
    });

    settingsClearEl.addEventListener("click", () => {
      settingsInstructionsEl.value = "";
      state.board.instructions = undefined;
      scheduleSave();
      settingsInstructionsEl.focus();
    });

    settingsDialogEl.addEventListener("click", (event) => {
      if (event.target === settingsDialogEl) {
        closeSettingsDialog();
      }
    });

    settingsViewRawEl.addEventListener("click", () => openRawDialog());

    rawDialogEl.addEventListener("click", (event) => {
      if (event.target === rawDialogEl) {
        if (rawDialogEl.open) rawDialogEl.close();
      }
    });

    async function openRawDialog() {
      rawContentEl.value = "Loading…";
      if (typeof rawDialogEl.showModal === "function") {
        rawDialogEl.showModal();
      } else {
        rawDialogEl.setAttribute("open", "");
      }
      try {
        const response = await fetch("/api/board/raw" + boardQuery(), { headers: { "Accept": "text/markdown" } });
        if (!response.ok) throw new Error(await response.text());
        rawContentEl.value = await response.text();
        rawContentEl.scrollTop = 0;
      } catch (error) {
        console.error(error);
        rawContentEl.value = "Failed to load: " + (error && error.message ? error.message : error);
      }
    }

    function openSettingsDialog() {
      settingsInstructionsEl.value = state.board.instructions ?? "";
      if (typeof settingsDialogEl.showModal === "function") {
        settingsDialogEl.showModal();
      } else {
        settingsDialogEl.setAttribute("open", "");
      }
    }

    function closeSettingsDialog() {
      if (settingsDialogEl.open) {
        settingsDialogEl.close();
      } else {
        settingsDialogEl.removeAttribute("open");
      }
    }

    function addColumn() {
      const column = {
        id: createId("column"),
        title: "New column",
        cards: []
      };
      state.board.columns.push(column);
      renderBoard();
      focusColumn(column.id);
      saveNow();
    }

    function addCard(columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      const card = {
        id: createId("card"),
        title: "New card",
        description: "",
        done: false
      };
      column.cards.push(card);
      renderBoard();
      focusCard(card.id);
      saveNow();
    }

    function deleteColumn(columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      if (column.cards.length > 0 && !window.confirm("Delete this column and its cards?")) {
        return;
      }

      state.board.columns = state.board.columns.filter((item) => item.id !== columnId);
      renderBoard();
      saveNow();
    }

    function deleteCard(columnId, cardId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      column.cards = column.cards.filter((item) => item.id !== cardId);
      renderBoard();
      saveNow();
    }

    function syncStateFromDom() {
      const columnById = new Map(state.board.columns.map((column) => [column.id, column]));
      const cardById = new Map(state.board.columns.flatMap((column) => column.cards.map((card) => [card.id, card])));
      const nextColumns = [];

      for (const columnEl of boardEl.querySelectorAll(".column")) {
        const column = columnById.get(columnEl.dataset.columnId);
        if (!column) continue;

        column.title = columnEl.querySelector(".column-title").value.trim() || "Untitled";
        column.cards = [];

        for (const cardEl of columnEl.querySelectorAll(".card")) {
          const card = cardById.get(cardEl.dataset.cardId);
          if (!card) continue;

          card.title = cardEl.querySelector(".card-title").value.trim() || "Untitled";
          card.done = cardEl.querySelector(".card-check").checked;
          column.cards.push(card);
        }

        nextColumns.push(column);
      }

      state.board.columns = nextColumns;
    }

    function scheduleSave() {
      state.isDirty = true;
      clearTimeout(state.saveTimer);
      state.saveTimer = setTimeout(() => saveNow(), 320);
      setStatus("Saving", "saving");
    }

    async function saveNow() {
      clearTimeout(state.saveTimer);
      syncStateFromDom();
      const token = ++state.saveToken;
      state.isDirty = true;
      state.isSaving = true;
      setStatus("Saving", "saving");

      try {
        const response = await fetch("/api/board" + boardQuery(), {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(state.board)
        });

        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();

        if (token === state.saveToken) {
          state.board = payload.board;
          state.fileVersion = payload.version;
          state.fileName = payload.fileName;
          state.isDirty = false;
          state.isSaving = false;
          setStatus("Saved", "saved");
        }
      } catch (error) {
        console.error(error);
        if (token === state.saveToken) {
          state.isSaving = false;
          setStatus("Save failed", "error");
        }
      }
    }

    function setStatus(text, mode) {
      statusTextEl.textContent = text;
      const iconName = mode === "error" ? "statusError" : mode === "saving" ? "statusSaving" : "statusSaved";
      statusIconEl.innerHTML = icons[iconName];
      statusEl.classList.toggle("is-saving", mode === "saving");
      statusEl.classList.toggle("is-error", mode === "error");
    }

    function button(text, className, label, iconName) {
      const element = document.createElement("button");
      element.type = "button";
      element.className = className;
      element.setAttribute("aria-label", label);
      element.title = label;

      if (iconName) {
        element.insertAdjacentHTML("afterbegin", icons[iconName]);
      }

      if (text) {
        const textEl = document.createElement("span");
        textEl.textContent = text;
        element.appendChild(textEl);
      }

      return element;
    }

    function getAfterElement(container, selector, position, axis) {
      const elements = [...container.querySelectorAll(selector)];
      let closest = { offset: Number.NEGATIVE_INFINITY, element: null };

      for (const child of elements) {
        const box = child.getBoundingClientRect();
        const midpoint = axis === "horizontal" ? box.left + box.width / 2 : box.top + box.height / 2;
        const offset = position - midpoint;

        if (offset < 0 && offset > closest.offset) {
          closest = { offset, element: child };
        }
      }

      return closest.element;
    }

    function growTextarea(textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    function focusColumn(columnId) {
      requestAnimationFrame(() => {
        const input = boardEl.querySelector('[data-column-id="' + columnId + '"] .column-title');
        input?.focus();
        input?.select();
      });
    }

    function focusCard(cardId) {
      requestAnimationFrame(() => {
        const input = boardEl.querySelector('[data-card-id="' + cssEscape(cardId) + '"] .card-title');
        input?.focus();
        input?.select();
      });
    }

    function buildDeeplinkUrl(hash) {
      return location.origin + location.pathname + location.search + (hash || "");
    }

    async function copyText(text, message) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }
        setStatus(message, "saved");
      } catch (error) {
        console.error(error);
        setStatus("Copy failed", "error");
      }
    }

    async function copyDeeplink(buttonEl, url, message) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = url;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }
        flashCopyButton(buttonEl);
        setStatus(message, "saved");
      } catch (error) {
        console.error(error);
        setStatus("Copy failed", "error");
      }
    }

    function flashCopyButton(buttonEl) {
      if (!buttonEl) return;
      buttonEl.classList.add("is-flash");
      setTimeout(() => buttonEl.classList.remove("is-flash"), 900);
    }

    function applyPendingDeeplink() {
      const hash = state.pendingDeeplink;
      if (!hash) return;

      const cardMatch = hash.match(/^#card=(.+)$/);
      const columnMatch = hash.match(/^#column=(.+)$/);
      let target = null;

      if (cardMatch) {
        const id = decodeURIComponent(cardMatch[1]);
        target = boardEl.querySelector('[data-card-id="' + cssEscape(id) + '"]');
      } else if (columnMatch) {
        const id = decodeURIComponent(columnMatch[1]);
        target = boardEl.querySelector('.column[data-column-id="' + cssEscape(id) + '"]');
      }

      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      target.classList.remove("is-deeplink-target");
      void target.offsetWidth;
      target.classList.add("is-deeplink-target");
      setTimeout(() => target.classList.remove("is-deeplink-target"), 1600);
      state.pendingDeeplink = null;
    }

    function cssEscape(value) {
      if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
      return value.replace(/["\\\\]/g, "\\\\$&");
    }

    window.addEventListener("hashchange", () => {
      state.pendingDeeplink = location.hash || null;
      applyPendingDeeplink();
    });

    function createId(prefix) {
      if (crypto.randomUUID) {
        return prefix + "-" + crypto.randomUUID();
      }

      return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }

    boardTitleEl.placeholder = state.fileName;
    loadBoard("initial");
    setInterval(checkDiskChanges, 1500);
  </script>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLucideIcon(iconNode: IconNode): string {
  return `<svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${renderIconChildren(iconNode as RenderableIconNode)}</svg>`;
}

function renderIconChildren(iconNode: RenderableIconNode): string {
  return iconNode
    .map(([tag, attrs, children]) => {
      const attributes = Object.entries(attrs)
        .map(([name, value]) => {
          if (value === undefined) {
            return "";
          }

          return ` ${name}="${escapeHtml(String(value))}"`;
        })
        .join("");
      const body = children ? renderIconChildren(children) : "";

      return `<${tag}${attributes}>${body}</${tag}>`;
    })
    .join("");
}
