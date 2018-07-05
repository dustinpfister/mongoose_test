conn = new Mongo();

db = conn.getDB('mongoose_users');

printjson({"dbName":db.getName(), "collectionNames": db.getCollectionNames()});
