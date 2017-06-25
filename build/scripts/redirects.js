const fs = require('fs-extra')
const path = require('path')
const logger = require('../lib/logger')
const project = require('../../project.config')

const redirects = () => Promise.resolve()
  .then(() => logger.info('Copying _redirects...'))
  .then((stats) => {
    logger.info(`Copying _redirects to ./${project.outDir}.`)
    logger.info(path.resolve(project.basePath, '_redirects'))
    fs.copy(
      path.resolve(project.basePath, '_redirects'),
      path.resolve(project.basePath, `${project.outDir}/_redirects`)
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Redirects finished successfully! See ./${project.outDir}.`)
  })
  .catch((err) => logger.error('Redirects encountered errors.', err))

redirects()
