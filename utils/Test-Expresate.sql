CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar UNIQUE NOT NULL,
  "country_id" int,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "country" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "active" boolean
);
