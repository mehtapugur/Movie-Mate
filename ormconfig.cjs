module.exports = {
  type: "mysql",
  url: process.env.DB,
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
  },
};
