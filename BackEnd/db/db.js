const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../db/knexfile'); // Knex.js yapılandırma dosyası

// Knex.js bağlantısını oluşturun
const knex = Knex(knexConfig.development);

// Objection.js için bağlantıyı tanıtın
Model.knex(knex);
