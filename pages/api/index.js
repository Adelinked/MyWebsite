import { projectsData, skillsData } from "../../data";

export default function handler(req, res) {
  switch (req.query.d) {
    case "projects":
      res.status(200).json(projectsData);
      break;
    case "skills":
      res.status(200).json(skillsData);
      break;
    default:
      res.status(404).json({ msg: "unknown query" });
      break;
  }
}
