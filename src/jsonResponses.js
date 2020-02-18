const users = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.end();
};

// return user object as JSON
const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };

    return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, body) => {
    // default json message
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    if (!body.name || !body.age) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    // default status code to 201 created
    let responseCode = 201;

    // if that user's name already exists in our object
    // then switch to a 204 updated status
    if (users[body.name]) {
        responseCode = 204;
    } else {
        // otherwise create an object with that name
        users[body.name] = {};
    }

    // add or update fields for this user name
    users[body.name].name = body.name;
    users[body.name].age = body.age;

    // if response is created, then set our created message
    // and sent response with a message
    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
    // create error message for response
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    // return a 404 with an error message
    return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    // return a 404 without an error message
    return respondJSONMeta(request, response, 404);
};

// public exports
module.exports = {
    getUsers,
    getUsersMeta,
    addUser,
    notFound,
    notFoundMeta,
};
