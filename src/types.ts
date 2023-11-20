export type Tag =
  | "design"
  | "web"
  | "webgl"
  | "hosting"
  | "blog"
  | "cms"
  | "anything imaginable";

export type Branch =
  | "studio"
  | "freelance"
  | "personal"
  | "sps"
  | "sps | pro-bono";

export type Project = {
  title: string;
  url: string;
  branch: Branch;
  tags: Array<Tag>;
  active: boolean;
};
