/**
 * This a forge app creates an issue in Jira.
 * Please set the API key as an environment variable. e.g. In forge CLI use `forge variables set API_KEY your-secret-api-key --encrypt`
 * 
 * Get the web trigger URL by running `forge install list` and `forge webtrigger` commands.
 * For more information, see https://developer.atlassian.com/platform/forge/manifest-reference/modules/web-trigger/
 */

import api, { route } from "@forge/api";

// Helper function for API key validation
const validateApiKey = (apiKey) => {
  const storedApiKey = process.env.API_KEY;
  return apiKey === storedApiKey;
};

const createIssue = async (projectKey, summary, description, issueType) => {
  const issue = await api.asApp().requestJira(route`/rest/api/3/issue`, {
    method: 'POST',
     headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: {
        project: {
          key: projectKey
        },
        summary: summary,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: description,
                  type: "text"
                }
              ]
            }
          ]
        },
        issuetype: {
          name: issueType
        }
      }
    })
  });

  return issue.json();
};

exports.runAsync = async (req) => {
  // Validate the API key
  const apiKeyHeader = req.headers['x-api-key'];
  const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

  if (!validateApiKey(apiKey)) {
    return {
      body: JSON.stringify({ error: 'Unauthorized' }),
      headers: { 'Content-Type': ['application/json'] },
      statusCode: 401,
      statusText: 'Unauthorized'
    };
  }

  const { projectKey, summary, description, issueType } = JSON.parse(req.body);

  try {
    const result = await createIssue(projectKey, summary, description, issueType);
    return {
      body: JSON.stringify(result),
      headers: {
        'Content-Type': ['application/json']
      },
      statusCode: 200,
      statusText: 'Accepted, Issue created'
    };
  } catch (error) {
    return {
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': ['application/json']
      },
      statusCode: 500,
      statusText: 'Internal Server Error'
    };
  }
};