-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paidBy" TEXT NOT NULL,
    "incomeType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLastUpdatedDate" TIMESTAMP(3) NOT NULL,
    "dateDeleted" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLastUpdated" TIMESTAMP(3) NOT NULL,
    "dateDeleted" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
