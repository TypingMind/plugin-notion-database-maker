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
