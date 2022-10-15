const { filesystem } = require('gluegun')

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    const name = parameters.first

    await generate({
      template: 'entity.js.ejs',
      target: `src/${name.toLowerCase()}/domain/entities/${name.toLowerCase()}.ts`,
      props: { name },
    })

    await generate({
      template: 'entity.spec.js.ejs',
      target: `src/${name.toLowerCase()}/domain/entities/${name.toLowerCase()}.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'entity.validator.js.ejs',
      target: `src/${name.toLowerCase()}/domain/validators/${name.toLowerCase()}.validator.ts`,
      props: { name },
    })

    await generate({
      template: 'entity.validator.spec.js.ejs',
      target: `src/${name.toLowerCase()}/domain/validators/${name.toLowerCase()}.validator.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'dto.js.ejs',
      target: `src/${name.toLowerCase()}/application/dto/${name.toLowerCase()}.output.ts`,
      props: { name },
    })

    await generate({
      template: 'repository.js.ejs',
      target: `src/${name.toLowerCase()}/domain/repository/${name.toLowerCase()}.repository.ts`,
      props: { name },
    })

    await generate({
      template: 'repository-in-memory.js.ejs',
      target: `src/${name.toLowerCase()}/infra/repository/db/in-memory/${name.toLowerCase()}-in-memory.repository.ts`,
      props: { name },
    })

    await generate({
      template: 'repository-in-memory.spec.js.ejs',
      target: `src/${name.toLowerCase()}/infra/repository/db/in-memory/${name.toLowerCase()}-in-memory.repository.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.create.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/create-${name.toLowerCase()}.use-case.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.create.spec.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/__tests__/unit/create-${name.toLowerCase()}.use-case.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.update.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/update-${name.toLowerCase()}.use-case.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.update.spec.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/__tests__/unit/update-${name.toLowerCase()}.use-case.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.delete.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/delete-${name.toLowerCase()}.use-case.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.delete.spec.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/__tests__/unit/delete-${name.toLowerCase()}.use-case.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.get.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/get-${name.toLowerCase()}.use-case.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.get.spec.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/__tests__/unit/get-${name.toLowerCase()}.use-case.spec.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.list.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/list-${name.toLowerCase()}s.use-case.ts`,
      props: { name },
    })

    await generate({
      template: 'usecase.list.spec.js.ejs',
      target: `src/${name.toLowerCase()}/application/usecases/__tests__/unit/list-${name.toLowerCase()}s.use-case.spec.ts`,
      props: { name },
    })

    const packageJSON = await filesystem.readAsync('package.json', 'json')

    packageJSON.imports = {
      ...packageJSON.imports,
      [`#${name.toLowerCase()}/application`]: `./dist/${name.toLowerCase()}/application/index.js`,
      [`#${name.toLowerCase()}/domain`]: `./dist/${name.toLowerCase()}/domain/index.js`,
      [`#${name.toLowerCase()}/infra`]: `./dist/${name.toLowerCase()}/infra/index.js`,
      [`#${name.toLowerCase()}/*`]: `./dist/${name.toLowerCase()}/*.js`,
    }

    packageJSON.exports = {
      ...packageJSON.exports,
      [`./${name.toLowerCase()}/application`]: `./dist/${name.toLowerCase()}/application/index.js`,
      [`./${name.toLowerCase()}/domain`]: `./dist/${name.toLowerCase()}/domain/index.js`,
      [`./${name.toLowerCase()}/infra`]: `./dist/${name.toLowerCase()}/infra/index.js`,
    }

    packageJSON.typesVersions['>=4.0'] = {
      ...packageJSON.typesVersions['>=4.0'],
      ...{
        [`${name.toLowerCase()}/application`]: [
          `./dist/${name.toLowerCase()}/application/index.d.ts`,
        ],
        [`${name.toLowerCase()}/domain`]: [
          `./dist/${name.toLowerCase()}/domain/index.d.ts`,
        ],
        [`${name.toLowerCase()}/infra`]: [
          `./dist/${name.toLowerCase()}/infra/index.d.ts`,
        ],
      },
    }

    await filesystem.writeAsync('package.json', packageJSON)

    const swcrc = await filesystem.readAsync('.swcrc', 'json')

    swcrc.jsc.paths = {
      ...swcrc.jsc.paths,
      [`#${name.toLowerCase()}/*`]: [`./${name.toLowerCase()}/*`],
    }

    await filesystem.writeAsync('.swcrc', swcrc)

    const tsconfig = await filesystem.readAsync('tsconfig.json', 'json')

    tsconfig.compilerOptions.paths = {
      ...tsconfig.compilerOptions.paths,
      [`#${name.toLowerCase()}/*`]: [`./${name.toLowerCase()}/*`],
    }

    await filesystem.writeAsync('tsconfig.json', tsconfig)

    let cti = await filesystem.readAsync('cti.sh')

    if (!JSON.stringify(cti).toLowerCase().includes(name.toLowerCase())) {
      cti += `

npm run cti create './src/${name.toLowerCase()}/application' -- -i '*spec.ts' -b && 
npm run cti create './src/${name.toLowerCase()}/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/${name.toLowerCase()}/infra' -- -i '*spec.ts' -b`

      await filesystem.writeAsync('cti.sh', cti)
    }

    info(`Generated files of module`)
  },
}
