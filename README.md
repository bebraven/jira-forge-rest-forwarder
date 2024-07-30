# jira-forge-rest-forwarder

**Description:**
This is a lightweight JavaScript based Atlassian Forge application to enable Jira issue creation using via REST API. This enables using the REST API without tieing the authorization to a user and fine-grained access control using scopes. Additionally the functionality of the App can be extended for the use cases other than creating Jira issues.

**Installation:**
* Clone the repository
* Install Atlassian Forge CLI `https://developer.atlassian.com/platform/forge/getting-started/`
* Install dependencies: `npm install`

**Development Setup:**
1. Connect to Jira using Forge CLI: `forge connect`
2. Go to the project directory: `cd jira-forge-rest-forwarder`
3. Set the API key as an environment variable. e.g. In forge CLI use `forge variables set API_KEY your-secret-api-key --encrypt`
4. Deploy the app: `forge deploy`
5. Install the app in your site: `forge install`
6. Run the app: `forge tunnel`
7. Get the web trigger URL by running `forge install list` and `forge webtrigger` commands.
8. Use the web trigger URL and the API Key to send a POST request to create an issue in Jira.

You may need to rename app the when deploy to Jira cloud.

**Usage**
Example POST request:
```
curl -X POST -H "Content-Type: application/json" -H "x-api-key: your-secret-api-key" -d \
'{"projectKey": "YOUR_PROJECT_KEY", "summary": "Issue summary", "description": "Issue description", "issueType": "Task"}'
```
