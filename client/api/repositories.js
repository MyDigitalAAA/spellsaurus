import spellsRepository from './spellsRepository'

// List of possible repositories
const repositories = {
    spells: spellsRepository
}

// Usage : RepositoryFactoryInstance.get('reponame');
export const RepositoryFactory = {
    get: name => repositories[name]
}