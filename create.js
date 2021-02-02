import * as uuid from "uuid";
import handler from "./libs/handler";
import dynamoDB from "./libs/dynamodb";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userID: event.requestContext.identity.cognitoIdentityId,
      noteID: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDB.put(params);

  return params.Item;
});

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// export async function main(event, context) {
//   // Request body is passed in as a JSON encoded string in 'event.body'
//   const data = JSON.parse(event.body);

//   const params = {
//     TableName: process.env.tableName,
//     Item: {
//       // The attr of the item to be created
//       userID: "123",
//       noteID: uuid.v1(),
//       content: data.content,
//       attachment: data.attachment,
//       createdAt: Date.now(),
//     },
//   };

//   try {
//     await dynamoDB.put(params).promise();
//     return {
//       statusCode: 200,
//       body: JSON.stringify(params.Item),
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: e.message }),
//     };
//   }
// }
