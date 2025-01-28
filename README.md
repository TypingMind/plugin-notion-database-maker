# **Notion Database Maker**
This plugin allows users to create a Notion database with detailed properties and settings.

### 📝 **User Setting Notes:**
#### 🔧 **Set Up the Plugin Server:**
- A plugin server must be set up to use this feature. Follow the detailed guide to set up a plugin server on Render: [How to Deploy the Plugin Server on Render](https://docs.typingmind.com/plugins/plugins-server/how-to-deploy-plugins-server-on-render)

#### 🔑 **Set Up Your Notion API Key:**
- Go to the [Notion Integration Page](https://www.notion.so/profile/integrations) and create a new integration.
- Copy the key from the Integration Detail Page.
- Paste the key into the plugin's user settings:
  **Notion API Key:** `ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

For detailed instructions, visit the [Notion Integration API Documentation](https://developers.notion.com/docs/create-a-notion-integration)

#### 🔗 **Share Your Database with the Integration:**
- Open your database in Notion.
- Click the **“Share”** button in the top right.
- Select **“Invite”**, search for your integration name, and click **“Invite”** to grant access.

For detailed instructions, visit the [Notion API Connections Documentation](https://www.notion.com/help/add-and-manage-connections-with-the-api)

### 📌 **Important Notes:**

#### ⚠️ **Limitations:**
- The plugin does **not support** the following property types: Relation, Rollup, Verification, and Unique ID.
- The order of properties is not preserved based on user input, and you will need to manually drag-and-drop the properties to adjust their order.

#### 👉 **Rate Limits:**
- There are rate limits for Notion API requests. Learn more at [Notion API Rate Limits](https://developers.notion.com/reference/request-limits#rate-limits).
- There are size limits on certain parameters, as well as the depth of children in requests. Learn more at [Notion API Size Limits](https://developers.notion.com/reference/request-limits#size-limits)


### 💡 **Example Usage**  
> Create a Database for Employee Directory on Notion.
>
> Database Name: TypingMind Employee Directory
>
> Parent Page: https://www.notion.so/TypingMind-Integration-12345bcxyz
>
> Description: The TypingMind Employee Directory is a simple tool to quickly find and connect with colleagues. It lets you search and filter employees by role, department, and more.
>
> Page Icon: 📇
>
> Cover Image: https://t4.ftcdn.net/jpg/09/77/83/07/240_F_977830794_XM1TKUBF0rO6bnOHZTGWASrr73Yt8Lng.jpg
>
> Database Structure:
> 1. Name (Title)
> 2. Years of Experience (Number)
> 3. Skills (Multi-select) - Options: Project Management, Programming, Data Analysis, Communication, Leadership, Design, Marketing, Sales, MLOps, FullStack
> 4. Probation Passed (Checkbox)
> 5. Location (Select) - Options: HQ - New York, Office - London, Office - Singapore, Remote - Domestic, Remote - International, Hybrid, Office - New York
> 6. Role (Select) - Options: Engineer, Manager, Designer, Analyst, Developer, Director, Coordinator, Specialist
> 7. LinkedIn Profile (URL)
> 8. Performance Review Status (Status) - Options: Not started, In progress, Done
> 9. Email (Email)
> 10. Start Date (Date)
> 11. Department (Select) - Options: Engineering, Marketing, Sales, HR, Finance, Operations, Customer Support, Design
> 12. Attachments (Files)
> 13. Phone (Phone Number)
> 14. Notes (Rich Text)
> 15. Title by Years of Experience: Formula: If Years of Experience == 0, then "Fresher"; if 1 <= Years of Experience < 3, then "Junior"; otherwise, "Senior".
