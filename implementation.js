/**
 * Perform a query operation on a Notion database.
 * @param {Object} params - The parameters for the operation.
 * @param {string} [params.parent] - The parent object where the database will be created.
 * @param {string} [params.icon] - The emoji icon of the page.
 * @param {string} [params.cover] - The cover image of the page.
 * @param {string} [params.title] - Defines the title of the page. Following rich_text property schema definition.
 * @param {Object} [params.notionProperties] - The property definitions for create a database in Notion.
 * @returns {Promise<Object>} - The response data from the Notion API.
 */
async function create_notion_database(params, userSettings) {
  const { parent, icon, cover, title, notionProperties = [] } = params;
  const { pluginServer, notionApiKey } = userSettings;

  if (!pluginServer) {
    throw new Error(
      "Missing the Plugin Server URL. Please set it in the plugin settings."
    );
  }

  if (!notionApiKey) {
    throw new Error(
      "Missing the Notion API Key. Please set it in the plugin settings."
    );
  }

  if (parent && parent.type === "page_id" && !parent.pageId) {
    throw new Error(
      "Missing the Page Id. Please provide specific Page ID or Page URL"
    );
  }

  if (!notionProperties.length) {
    throw new Error(
      "Missing the Database Properties. Please provide valid structure of your provided database."
    );
  }

  try {
    // Build the column schema for the database based on the provided notion properties
    const databaseProperties = notionProperties.map((property) =>
      buildColumnSchema(property)
    );

    // Prepare the request payload to create the Notion database
    const payload = {
      parent: {
        type: parent.type,
        page_id: parent.pageId || undefined, // pageId is required if type is "page_id"
      },
      icon: icon,
      cover: cover,
      title: title,
      properties: databaseProperties.reduce((acc, schema) => {
        return { ...acc, ...schema.properties };
      }, {}),
    };

    // Make API request to create the database
    const response = await axios.post(
      `${pluginServer}/api/v1/notion/databases`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

function buildColumnSchema({
  columnName,
  columnType,
  options = [],
  format = "decimal",
  formatDate,
  formula = "",
}) {
  const schema = {
    properties: {},
  };

  // Define properties based on the column type
  switch (columnType) {
    case "title":
      schema.properties[columnName] = { title: {} };
      break;
    case "rich_text":
      schema.properties[columnName] = { rich_text: {} };
      break;
    case "number":
      schema.properties[columnName] = { number: { format: format } };
      break;
    case "select":
      schema.properties[columnName] = {
        select: {
          options: options.map((option) => ({ name: option })),
        },
      };
      break;
    case "multi_select":
      schema.properties[columnName] = {
        multi_select: {
          options: options.map((option) => ({ name: option })),
        },
      };
      break;
    case "date":
      schema.properties[columnName] = {
        date: {
          format: formatDate,
        },
      };
      break;
    case "checkbox":
      schema.properties[columnName] = { checkbox: {} };
      break;
    case "url":
      schema.properties[columnName] = { url: {} };
      break;
    case "email":
      schema.properties[columnName] = { email: {} };
      break;
    case "phone_number":
      schema.properties[columnName] = { phone_number: {} };
      break;
    case "formula":
      schema.properties[columnName] = {
        formula: {
          expression: formula, // Formula expression goes here
        },
      };
      break;
    case "status":
      schema.properties[columnName] = { status: {} };
      break;
    default:
      throw new Error(`Unknown column type: ${columnType}`);
  }

  return schema;
}
