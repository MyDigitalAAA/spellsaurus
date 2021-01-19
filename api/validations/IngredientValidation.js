const Ingredient = {
    "id": "/IngredientValidation",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" }
    },
    "required": ["name", "description"]
}

module.exports = Ingredient