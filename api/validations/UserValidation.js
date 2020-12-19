const User = {
    "id": "/UserValidation",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "mail": { "type": "string" },
        "password": { "type": "string" },
    },
    "required": ["name", "password", "mail"]
}

module.exports = User