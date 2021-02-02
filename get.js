import handler from "./libs/handler";
import dynamoDB from "./libs/dynamodb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // Key defines the partition key and the sort key of the item to be recieved
    Key: {
      userID: "123",
      noteID: event.pathParameters.id,
    },
  };

  const result = await dynamoDB.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
