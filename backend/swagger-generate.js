import swaggerAutoGen from "swagger-autogen";

const generateSwaggerDocumentation = swaggerAutoGen();

const outputFile = "./swagger-output.json";
const endpoints = ["./server.js"];

generateSwaggerDocumentation(outputFile, endpoints).then(() => {
  console.log("Swagger documentation generated successfully");
});
