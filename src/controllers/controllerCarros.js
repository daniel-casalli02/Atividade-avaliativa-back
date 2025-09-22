import express from "express";
import dados from "../models/dados.js";
const {carros} = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;
  
    res.status(200).json({
      total: resultado.length,
      data: resultado,
    });
  };

  const getCarrosById = (req, res) => {
    let id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);

    if(!carro) {
        res.status(404).json({
            success: false,
            message: `Nenhum carro foi encontrado com esse id:${id}`
        })
    }

    res.status(200).json({
        total: carro.length,
        data: carro
    })

  }

  const createCarro = (req, res) => {
    const {marca, modelo, ano, cor, preco, combustivel, quilometragem} = req.body

    if(!marca || !modelo){
        req.status(400).json({
            seccess: false,
            message: "Marca e modelo são obrigatorios para a criação de um novo carro"
        })
    }
    
    const novoCarro = {
        id: carros.length +1,
        marca,
        modelo,
        ano: parseInt(ano),
        preco,
        combustivel,
        quilometragem,
    };

    carros.push(novoCarro);

    res.status

  }