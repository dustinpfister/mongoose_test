// create a Mongo instance
conn = new Mongo();

// conf
conf = {

    dbName: 'admin',
    userName: 'mrSmith',
    password: '1234'

};

// get the admin db
db = conn.getDB(conf.dbName);

// authenticate
db.auth(conf.userName, conf.password);

// the user exists, print info.
printjson({
    "dbName": db.getName(),
    "users": db.getUsers()
});
