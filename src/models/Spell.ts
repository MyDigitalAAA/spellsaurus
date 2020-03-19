class Spell {

    private id: number
    private name: string
    private description: string
    private cost: number
    private charge: number
    private schools: Array<string>
    private ingredients: Array<string>
    private variables: Array<string>

    constructor(id: number) {
        this.id = id
    }

}

export default Spell;