-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email_address" TEXT NOT NULL,
    "Is_Youtuber" BOOLEAN NOT NULL,
    "Is_Pro" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
