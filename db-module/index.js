'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)
  // Configuramos las relaciones
  AgentModel.hasMany(MetricModel) // El modelo de agente tiene muchas metricas
  MetricModel.belongsTo(AgentModel) // El modelo de metrica tiene un agente

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true }) // force significa que si la db existe la borra y crea una nueva
  }

  const Agent = {}
  const Metric = {}
  return {
    Agent,
    Metric
  }
}
