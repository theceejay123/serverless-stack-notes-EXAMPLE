import handler from "./libs/handler";
import dynamoDB from "./libs/dynamodb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userID = :userID': only returns the items maching the 'userID'
    // partition key
    KeyConditionExpression: "userID = :userID",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userID': defines 'userID' to be the ID of the author
    ExpressionAttributeValues: {
      ":userID": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDB.query(params);

  return result.Items;
});
