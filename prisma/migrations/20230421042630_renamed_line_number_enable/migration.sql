/*
  Warnings:

  - You are about to drop the column `lineNumbersEnable` on the `EditorSettings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EditorSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "lineNumbersEnabled" BOOLEAN NOT NULL DEFAULT true,
    "bracketMatchingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "closeBracketsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "autocompletionEnabled" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "EditorSettings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EditorSettings" ("autocompletionEnabled", "bracketMatchingEnabled", "closeBracketsEnabled", "id", "projectId") SELECT "autocompletionEnabled", "bracketMatchingEnabled", "closeBracketsEnabled", "id", "projectId" FROM "EditorSettings";
DROP TABLE "EditorSettings";
ALTER TABLE "new_EditorSettings" RENAME TO "EditorSettings";
CREATE UNIQUE INDEX "EditorSettings_projectId_key" ON "EditorSettings"("projectId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
