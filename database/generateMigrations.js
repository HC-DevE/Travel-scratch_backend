const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "test_sequelize_v4",
  process.env.LOCAL_DB_USERNAME,
  process.env.LOCAL_DB_PASSWD,
  {
    host: process.env.LOCAL_DB_HOST,
    dialect: "mysql",
    // dialectOptions: {
    // ssl: {
    //   require: false,
    //   rejectUnauthorized: true, //TODO: Set to `false` if using a self-signed certificate
    // },
    // },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true, // use snake_case column names in tables
    },
    logging: false, // disable logging of SQL queries
  }
);

// //working
async function generateMigrations() {
  try {
    // Get all model files from the models directory
    const modelsPath = path.join(__dirname, "src", "models");
    const modelFiles = fs.readdirSync(modelsPath);

    // Generate the migration files for each model
    for (const file of modelFiles) {
      const modelName = file.replace(".js", "");
      const modelPath = path.join(modelsPath, file);

      // Import the model dynamically
      const modelDefinition = require(modelPath);
      const model = modelDefinition(sequelize);

      // Get the column definitions for the model
      const columnDefinitions = {};
      for (const columnName in model.rawAttributes) {
        const columnDefinition = model.rawAttributes[columnName];
        const columnOptions = {};

        // Map Sequelize data types to SQL data types
        if (columnDefinition.type.key === DataTypes.STRING.key) {
          columnOptions.type = DataTypes.STRING;//TODO
          if (columnDefinition.type._length) {
            columnOptions.length = columnDefinition.type._length;
          }
        } else if (columnDefinition.type.key === DataTypes.ENUM.key) {
          columnOptions.type = `ENUM('${columnDefinition.values.join(
            "', '"
          )}')`;
        } else {
          columnOptions.type = columnDefinition.type.key;
        }

        // Set other column options
        columnOptions.allowNull = columnDefinition.allowNull;
        columnOptions.defaultValue = columnDefinition.defaultValue;
        columnOptions.primaryKey = columnDefinition.primaryKey;
        columnOptions.autoIncrement = columnDefinition.autoIncrement;
        columnOptions.references = columnDefinition.references;

        columnDefinitions[columnName] = columnOptions;
      }

      // Generate the migration file content
      const migrationName = `create_${modelName.toLowerCase()}s`;
      const migrationContent = `module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('${modelName.toLowerCase()}s', ${JSON.stringify(
        columnDefinitions,
        null,
        2
      )});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('${modelName.toLowerCase()}s');
        }
      };`;

      // Create the migration file
      const migrationsPath = path.join(__dirname, "database", "migrations");
      const migrationFile = path.join(
        migrationsPath,
        `${Date.now()}-${migrationName}.js`
      );
      fs.writeFileSync(migrationFile, migrationContent);

      console.log(`Migration file created for ${modelName}`);
    }

    console.log("Migration files generated successfully");
  } catch (error) {
    console.error("Error generating migration files:", error);
  } finally {
    await sequelize.close();
  }
}

generateMigrations();
