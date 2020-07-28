const { isNullOrUndefined } = require('util')
const Pool = require('pg').Pool

const pool = new Pool({
    host: "hh-pgsql-public.ebi.ac.uk",
    port: 5432,
    database: "pfmegrnargs",
    user: "reader",
    password: "NWDMCE5xdipIjRrp"
})

const getProteins = async (request, response) => {
  const initialLimit = request.params.initialLimit || "1"
  const finalLimit = request.params.finalLimit || "10"
  const Offset = request.params.Offset || "0" 
  const query = `SELECT * FROM protein_info LIMIT ${initialLimit} | ${finalLimit} OFFSET ${Offset}`
  try{
    await pool.query(query, (error, results) => {
      if(results.rows <= 0 || results.isNullOrUndefined){
        return response.status(404).json(errorHandler(404,"Proteína não encontrada."))       
      }
      return response.status(200).json(results.rows)    
    }
    )
  }
  catch(error){
    return response.status(500).json(errorHandler(500,"Erro interno do servidor.")) 
  }}

const getProteinById = async (request, response) => {
  // a chave primária na tabela protein_info é o campo "protein_accession"
  const id = request.params.id  
  let query = `SELECT * FROM protein_info WHERE protein_accession = '${id}'`
  try{
  await pool.query(query, (error, results) => {
    if(results.rows <= 0 || results.isNullOrUndefined){
      return response.status(404).json(errorHandler(404,"Proteína não encontrada."))       
    }
    return response.status(200).json(results.rows)    
  }
  )
}
catch(error){
  return response.status(500).json(errorHandler(500,"Erro interno do servidor.")) 
}}

errorHandler = (code,error) => {
    return {
      code: code,
      error: error,
    }
}

module.exports = {
  getProteins,
  getProteinById,
}