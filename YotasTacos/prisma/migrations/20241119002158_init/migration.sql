/*
  Warnings:

  - You are about to drop the column `image_filename` on the `Product` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desciption" TEXT,
    "cost" REAL NOT NULL,
    "filename" TEXT NOT NULL
);
INSERT INTO "new_Product" ("cost", "desciption", "name", "product_id") SELECT "cost", "desciption", "name", "product_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
