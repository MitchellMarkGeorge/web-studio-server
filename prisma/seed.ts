import { PrismaClient } from ".prisma/client";
import { ProjectBuilder } from "../src/ProjectBuilder";

const db = new PrismaClient();
const projectBuilder = new ProjectBuilder();
const main = async () => {
  const result = await db.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Test",
      javascriptCode: "",
      cssCode: "",
      htmlCode: "",
      workspaceSettings: {
        connectOrCreate: {
          create: { id: 1 },
          where: { id: 1 },
        },
      },
      editorSettings: {
        connectOrCreate: {
          create: { id: 1 },
          where: { id: 1 },
        },
      },
      javascriptSettings: {
        connectOrCreate: {
          create: { id: 1 },
          where: { id: 1 },
        },
      },
      cssSettings: {
        connectOrCreate: {
          create: { id: 1 },
          where: { id: 1 },
        },
      },
      htmlSettings: {
        connectOrCreate: {
          create: { id: 1 },
          where: { id: 1 },
        },
      },
    },
  });
  console.log(result);
  await projectBuilder.buildProject({
    projectId: result.id.toString(),
    css: "",
    js: "",
    html: "",
  });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
