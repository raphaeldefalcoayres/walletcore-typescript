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
      template: 'entity.validator.js.ejs',
      target: `src/${name.toLowerCase()}/domain/validators/${name.toLowerCase()}.validator.ts`,
      props: { name },
    })

    info(`Generated files of module`)
  },
}
