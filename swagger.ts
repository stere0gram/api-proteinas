const swaggerDocument = {
    "openapi":"3.0.1",
    "info":{
       "version":"1.0.0",
       "title":"Busca de proteínas",
       "description":"Essa é uma api simples para um teste da vaga desenvolvedor júnior da empresa Randon.",       
       "contact":{
          "name":"Lucas Peruzzatto Siqueira",
          "email":"lucas_rs12@hotmail.com"
       }
    },
    "servers":[
       {
          "url":"http://localhost:3000/",
          "description":"Servidor local"
       }
    ],
    "produces":[
       "application/json"
    ],
    "paths":{
       "/proteins/{initialLimit}/{finalLimit}/{Offset}":{
          "parameters":[
             {
                "name":"initialLimit",
                "in":"path",
                "required":false,
                "description":"Intervalo inicial do número de registros retornados.",
                "type":"string",
                "default": "1",
             },
             {
                "name":"finalLimit",
                "in":"path",
                "required":false,
                "description":"Intervalo final do número de registros retornados.",
                "type":"string",
                "default": "10",
             },
             {
                "name":"Offset",
                "in":"path",
                "required":false,
                "description":"Número de registros que serão pulados.",
                "type":"string",
                "default": "0",
             }
          ],
          "get":{
             "tags":[
                "Proteins",
             ],
             "summary":"Busca todas as proteínas",
             "responses":{
                "200":{
                   "description":"OK",
                },
                "404":{
                   "description":"Não encontrado",
                },
                "500":{
                   "description":"Erro interno do servidor",
                }
             }
          }
       },
       "/protein/{id}":{
          "parameters":[
             {
                "name":"id",
                "in":"path",
                "required":false,
                "description":"ID da proteina, correspondente ao campo chave primária protein_accession da tabela protein_info ",
                "type":"string"
             }
          ],
          "get":{
             "tags":[
                "protein"
             ],
             "summary":"Busca a proteina com o devido id, correspondente ao campo chave primária protein_accession'",
             "parameters":[
                {
                   "in":"path",
                   "name":"id",
                   "required":true,
                   "description":"ID da proteína (Campo protein_accesion)",
                   "default":"ENSEMBL:ERS011762_02334",
                }
             ],
             "responses":{
                "200":{
                   "description":"OK",
                },
                "404":{
                   "description":"Proteina não encontrada."
                },
                "500":{
                   "description":"Erro interno do servidor."
                }
             }
          }
       }
    },
    "definitions":{
       "id":{
          "properties":{
             "protein_accession":{
                "type":"string",
                "example":"ENSEMBL:ERS239585_01431"
             }
          }
       },
       "proteins":{
          "type":"object",
          "properties":{
             "protein_accession":{
                "type":"string"
             },
             "description":{
                "type":"string"
             },
             "label":{
                "type":"string"
             },
             "synonyms":{
                "type":"array",
                "example":[
                   "ERS239585_01431"
                ]
             }
          }
       },
    }
 }

module.exports = {
  swaggerDocument
}