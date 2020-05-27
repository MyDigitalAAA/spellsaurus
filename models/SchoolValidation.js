const School = {
    "id": "/SchoolModel",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "id_meta_school": { "type": "number" },
    },
    "required": ["name", "description", "id_meta_school"]
}

module.exports = School