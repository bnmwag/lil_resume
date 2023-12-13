import type { Project } from "../types.ts";

const exportState = true;

export const data: Project[] = [
  {
    title: "HW-Technik",
    url: "https://hwtechnik.at/",
    branch: "freelance",
    tags: ["web", "design", "hosting"],
    active: true,
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
    url: "https://aa-r.vercel.app",
    branch: "sps",
    tags: ["web", "webgl", "design"],
    active: true,
  },
  {
    title: "Neuronet.ink",
    url: "https://neuronet.ink",
    branch: "freelance",
    tags: ["web", "blog", "cms", "hosting"],
    active: true,
  },
];

export const projects = exportState ? data : null;
