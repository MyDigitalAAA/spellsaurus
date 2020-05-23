const User = {
    "id": "/UserModel",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "mail": { "type": "string" },
        "password": { "type": "string" },
        "banned": { "type": "boolean"},
    },
    "required": ["name", "password", "mail"]
}

module.exports = User