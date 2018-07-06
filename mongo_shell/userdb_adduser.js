// create a Mongo instance
conn = new Mongo();


// get the admin db
db = conn.getDB('mongoose_users');

// authenticate
//db.auth('mrSmith', '1234');

// if the admin account exists get it, or null
user = db.getUser('dustin');

// if we do not have the user, create the user
if (!user) {

    // then create the user
    db.createUser({
        user: 'dustin',
        pwd: '1234',
        roles: [{
                role: 'readWrite',
                db: 'mongoose_users'
            }
        ]
    });

} else {

    // the user exists, print info.
    printjson({
        "dbName": db.getName(),
        "adminUser": user
    });

}
