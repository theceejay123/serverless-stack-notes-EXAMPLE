import handler from "./libs/handler";
import dynamoDB from "./libs/dynamodb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userID: "123",
      noteID: event.pathParameters.id,
    },
  };

  await dynamoDB.delete(params);

  return { status: true };
});
