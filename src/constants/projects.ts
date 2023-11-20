import type { Project } from "../types.ts";

const exportState = true;

export const data: Project[] = [
  {
    title: "studio",
    url: "https://studio.bnmwag.dev",
    branch: "studio",
    tags: ["anything imaginable"],
    active: false,
  },
  {
    title: "HW-Technik",
    url: "https://hwtechnik.at/",
    branch: "freelance",
    tags: ["web", "design", "hosting"],
    active: true,
  },
  {
    title: "assaabloy",
    url: "https://assaabloy.at",
    branch: "sps",
    tags: ["web", "webgl", "design"],
    active: false,
  },
  {
    title: "Bosch Rexroth SFE",
    url: "https://bosch-sfe-scrolly.vercel.app/",
    branch: "sps | pro-bono",
    tags: ["web", "webgl", "design"],
    active: true,
  },
  {
    title: "Weller Filtration Unit",
    url: "https://scroll-way.vercel.app/",
    branch: "sps | pro-bono",
    tags: ["web", "webgl"],
    active: true,
  },
  {
    title: "assaabloy",
    url: "https://aa-r.vercel.at",
    branch: "sps",
    tags: ["web", "webgl", "design"],
    active: true,
  },
  {
    title: "Neuronet.ink",
    url: "https://neuronet.ink",
    branch: "freelance",
    tags: ["design", "web", "blog", "cms", "hosting"],
    active: false,
  },
];

export const projects = exportState ? data : null;
