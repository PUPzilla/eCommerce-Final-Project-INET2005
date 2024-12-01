-- CreateTable
CREATE TABLE "Purchase" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL,
    "credit_expire" TEXT NOT NULL,
    "credit_cvv" INTEGER NOT NULL,
    "invoice_amt" REAL NOT NULL,
    "invoice_tax" REAL NOT NULL,
    "invoice_total" REAL NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);
