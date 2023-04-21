-- CreateTable
CREATE TABLE "WorkspaceSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "livePreview" BOOLEAN NOT NULL DEFAULT false,
    "layout" TEXT NOT NULL DEFAULT 'colunm',
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "WorkspaceSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JavascriptSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preset" TEXT NOT NULL DEFAULT 'ES6',
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "JavascriptSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CSSSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preset" TEXT NOT NULL DEFAULT 'CSS',
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "CSSSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HTMLSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preset" TEXT NOT NULL DEFAULT 'HTML',
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "HTMLSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EditorSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "lineNumbersEnable" BOOLEAN NOT NULL DEFAULT true,
    "bracketMatchingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "closeBracketsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "autocompletionEnabled" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "EditorSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "enableJs" BOOLEAN NOT NULL DEFAULT true,
    "javascriptCode" TEXT NOT NULL DEFAULT '',
    "cssCode" TEXT NOT NULL DEFAULT '',
    "htmlCode" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceSettings_projectId_key" ON "WorkspaceSettings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "JavascriptSettings_projectId_key" ON "JavascriptSettings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "CSSSettings_projectId_key" ON "CSSSettings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "HTMLSettings_projectId_key" ON "HTMLSettings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "EditorSettings_projectId_key" ON "EditorSettings"("projectId");
