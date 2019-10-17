CREATE TABLE "countries" (
	"country_id" serial NOT NULL,
	"region" TEXT,
	"country" TEXT,
	PRIMARY KEY ("country_id")
);



CREATE TABLE "population" (
	"country_id" int NOT NULL,
	"year" int,
	"population" int
);



CREATE TABLE "country_lookup" (
	"name" TEXT NOT NULL,
	"country_id" int NOT NULL
);



CREATE TABLE "suicide" (
	"country_id" int NOT NULL,
	"year" int,
	"suicide_no" int
);



CREATE TABLE "happiness" (
	"country_id" int NOT NULL,
	"year" int,
	"happiness_rank" int,
	"happiness" float4,
	"economy" float4,
	"family" float4,
	"health" float4,
	"freedom" float4,
	"trust" float4,
	"generosity" float4,
	"dystopia" float4
);




ALTER TABLE "population" ADD CONSTRAINT "population_fk0" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id");


ALTER TABLE "suicide" ADD CONSTRAINT "suicide_fk0" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id");

ALTER TABLE "happiness" ADD CONSTRAINT "happiness_fk0" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id");
