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
> Create an Inline Database named “TypingMind Employee Directory” under my Notion Page URL https://www.notion.so/TypingMind-18a6a66d6ac98006ad95f8f7d8130dad
>
> Description: The TypingMind Employee Directory is a simple tool to quickly find and connect with colleagues. It lets you search and filter employees by role, 
department, and more.
> Icon: 📇
> Cover Image: https://t4.ftcdn.net/jpg/09/77/83/07/240_F_977830794_XM1TKUBF0rO6bnOHZTGWASrr73Yt8Lng.jpg
>
> Database Structure:
> 1. Name (Title)
> 2. Attachments (Files)
> 3. Department (Select) - Options: Engineering, Marketing, Sales, HR, Finance, Operations, Customer Support, Design
> 4. Email (Email)
> 5. LinkedIn Profile (URL)
> 6. Location (Select) - Options: HQ - New York, Office - London, Office - Singapore, Remote - Domestic, Remote - International, Hybrid, Office - New York
> 7. Notes (Rich Text)
> 8. Performance Review Status (Status) - Options: Not started, In progress, Done
> 9. Phone (Phone Number)
> 10. Probation Passed (Checkbox)
> 11. Role (Select) - Options: Engineer, Manager, Designer, Analyst, Developer, Director, Coordinator, Specialist
> 12. Skills (Multi-select) - Options: Project Management, Programming, Data Analysis, Communication, Leadership, Design, Marketing, Sales, MLOps, FullStack
> 13. Start Date (Date)
> 14. Title by Years of Experience: If Years of Experience = 0, then "Fresher"; if Years of Experience >= 1 and Years of Experience < 3, then "Junior"; otherwise, "Senior".
> 15. Years of Experience (Number)