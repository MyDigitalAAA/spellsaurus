const MetaSchool = {
    "id": "/MetaSchoolValidation",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "schools": { "type": "array" }
    },
    "required": ["name", "description"]
}

module.exports = MetaSchool