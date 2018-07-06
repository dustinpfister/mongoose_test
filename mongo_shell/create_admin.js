// create a Mongo instance
conn = new Mongo();

// conf
conf = {

    dbName: 'admin',
    adminUserName: 'mrSmith',
    password: '1234',
    roles: [{
            role: 'userAdminAnyDatabase',
            db: 'admin'
        }
    ]

};

// get the admin db
db = conn.getDB(conf.dbName);

// if the admin account exists get it, or null
adminUser = db.getUser(conf.adminUserName);

// if we do not have smith, create smith
if (!adminUser) {

    // then create the admin user
    db.createUser({
        user: conf.adminUserName,
        pwd: conf.password,
        roles: conf.roles
    });


} else {

    // the admin user exists, print info on the admin
    printjson({
        "dbName": db.getName(),
        "adminUser": adminUser
    });

}

// mongo --port 27017 -u "mrSmith" -p "1234" --authenticationDatabase "admin"