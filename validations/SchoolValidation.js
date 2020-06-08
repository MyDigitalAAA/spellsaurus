const School = {
    "id": "/SchoolValidation",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "meta_school_id": { "type": "number" },
    },
    "required": ["name", "description", "meta_school_id"]
}

module.exports = School