const SpellModel = {
    "id": "/SpellModel",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "level": { "type": "number" },
        "charge": { "type": "number" },
        "cost": { "type": "string" },
        "is_ritual": { "type": "boolean" },
        "schools": {
            "type": { "type": "array" },
            "items": {
                "properties": {
                    "id": { "type": "number" },
                }
            }
        },
        "variables": {
            "type": { "type": "array" },
            "items": {
                "properties": {
                    "id": { "type": "number" },
                }
            }
        },
        "ingredients": {
            "type": { "type": "array" },
            "items": {
                "properties": {
                    "id": { "type": "number" },
                }
            }
        }
    },
    "required": ["name", "description"]
}

module.exports = SpellModel