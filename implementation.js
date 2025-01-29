/**
 * Perform a query operation on a Notion database.
 * @param {Object} params - The parameters for the operation.
 * @param {string} [params.parent] - The parent object where the database will be created.
 * @param {string} [params.icon] - The emoji icon of the page.
 * @param {string} [params.cover] - The cover image of the page.
 * @param {string} [params.title] - Defines the title of the page. Following rich_text property schema definition.
 * @param {string} [params.description] - Defines the description of the page. Following rich_text property schema definition.
 * @param {string} [params.isInline] - Specifies whether the database is created inline. The default value is false.
 * @param {Object} [params.notionProperties] - The property definitions for create a database in Notion.
 * @returns {Promise<Object>} - The response data from the Notion API.
 */
async function create_notion_database(params, userSettings) {
  const {
    parent,
    icon,
    cover,
    title,
    description,
    isInline = false,
    notionProperties = [],
  } = params;
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

  try {
    const result = await createDatabase({
      notionApiKey: notionApiKey,
      pluginServerUrl: pluginServer,
      parent: parent,
      icon: icon,
      cover: cover,
      title: title,
      description: description,
      isInline: isInline,
      notionProperties: notionProperties,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
}

async function createDatabase({
  notionApiKey,
  pluginServerUrl,
  parent,
  icon,
  cover,
  title,
  description,
  isInline,
  notionProperties = [],
}) {
  const requestBody = {
    notionApiKey: notionApiKey,
    parent: parent,
    icon: icon,
    cover: cover,
    title: title,
    description: description,
    isInline: isInline,
    notionProperties: notionProperties,
  };

  try {
    const response = await fetch(
      `${pluginServerUrl}/notion-database/create-database`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Error create database: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to create database: ${error.message}`);
  }
}
