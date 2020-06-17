import spellsRepository from './spellsRepository'
import schoolsRepository from './schoolsRepository'
import metaschoolsRepository from './metaschoolsRepository'
import variablesRepository from './variablesRepository'
import ingredientsRepository from './ingredientsRepository'

// List of possible repositories
const repositories = {
    spells: spellsRepository,
    schools: schoolsRepository,
    metaschools: metaschoolsRepository,
    variables: variablesRepository,
    ingredients: ingredientsRepository,
}

// Usage : RepositoryFactoryInstance.get('reponame');
export const RepositoryFactory = {
    get: name => repositories[name]
}