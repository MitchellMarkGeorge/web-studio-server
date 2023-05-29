import { PrismaClient } from "@prisma/client";
import express from "express";
import { ProjectBuilder } from "./ProjectBuilder";
import cors from "cors";

const db = new PrismaClient();
const projectFileBuilder = new ProjectBuilder();

const app = express();

app.use(express.json());

app.use(cors());

// CRUD project settings
// update workspace settings
// update editor settings
// update code (js, css, html)

app.get("/projects", async (req, res) => {
  // think about this -> should i just send the project id and name
  try {
    const result = await db.project.findMany({
      select: { id: true, name: true },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Unable to get all projects" });
  }
});

app.get("/project/:projectId", async (req, res) => {
    console.log("here");
  const { projectId } = req.params;
  try {
    const result = await db.project.findFirst({
      where: { id: Number.parseInt(projectId) },
      include: {
        workspaceSettings: true,
        editorSettings: true,
        javascriptSettings: true,
        cssSettings: true,
        htmlSettings: true,
      },
    });
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Unable to get project with id ${projectId}` });
  }
});

app.put("/project/:projectId/code", async (req, res) => {
  const { projectId } = req.params;
  const { js, css, html } = req.body as {
    js: string;
    css: string;
    html: string;
  };

  try {
    await db.project.update({
      where: { id: Number.parseInt(projectId) },
      data: { javascriptCode: js, cssCode: css, htmlCode: html },
    });
  } catch (error) {
    res.status(500).json({
      error: `Unable to save code to database with project id ${projectId}`,
    });
    return;
  }

  // rebuild project file

  try {
    await projectFileBuilder.buildProject({ js, css, html, projectId });
    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to build project file with provided code" });
  }
});

// TODO: Createing a project -> also create the project file

app.put("/project/:projectId/settings", async (req, res) => {
  const { projectId } = req.params;
  //   const { editorSettings, workspaceSettings, projectSettings, javascriptSettings, cssSettings, htmlSettings } = req.body;
  try {
    await db.project.update({
      where: { id: Number.parseInt(projectId) },
      data: req.body,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Unable to update project settings" });
  }
});

app.get("/project/:projectId/preview", async (req, res) => {
    console.log("rendering project");
  const { projectId } = req.params;
  // should build the project if it not found
  res.sendFile(projectFileBuilder.getProjectFilePath(projectId));
});

app.listen(8000, () => {
    projectFileBuilder.buildProject({ projectId: "1", css: "", html: "", js: ""});
    console.log("Server started");
})
