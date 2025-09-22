import express from "express";
import dados from "../models/dados.js";
const {carros} = dados;


const getAllCarros = (req, res) => {
    let resultado = carros;
  
    res.status(200).json({
      total: resultado.length,
      data: resultado,
    });
    
    app.get('/carros', (req, res) => {
    const {marca, ano, preco, combustivel,} = req.query;
    let resultado = carros;

    if (marca) {
        resultado = resultado.filter(c =>c.marca.toLowerCase() === marca.toLowerCase());
    }

    if (ano) {
        resultado = resultado.filter(c => c.ano == ano)
    }
    
    res.status(200).json({
        total: resultado.length,
        data: resultado
      });
})
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
        cor,
        preco,
        combustivel,
        quilometragem,
    };

    carros.push(novoCarro);

    res.status(200).json({
        success: true,
        message:"Carro criado com sucesso",
        carro: novoCarro,
    })

  }

  const deleteCarro = (req, res) => {
    const {id} = req.params;
    
    if(isNaN(id)) {
        res.status(400).json({
            success:false,
            message:"O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const carroParaRemover = carros.find((c) => c.id === idParaApagar);

    if(!carroParaRemover) {
        res.status(404).json({
            success:false,
            message: `O carro com id ${id} não é válido`,
        });
    }

    const carrosFiltrados = carros.filter(c => c.id !== idParaApagar);

    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        success: true,
        message: `Carro ${carroParaRemover.marca} id:${id} foi removido`,
        carroRemovido: carroParaRemover,
    });
  }

const updateCarro = (req, res ) => {
    const id = parseInt(req.params.id);
    const {marca, modelo, ano, cor, preco, combustivel, quilometragem} = req.body;

    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
          success: false,
          message: `O carro com o id:${idParaEditar} não existe`,
        });
      }
   
    const carroAtualizados = carros.map((carro) =>
    carro.id === idParaEditar ? {
        ...carro,
        ...(marca && {marca}),
        ...(modelo && {modelo}),
        ...(ano && { ano : parseInt(ano)}),
        ...(cor && {cor} ),
        ...(preco && {preco}),
        ...(combustivel && {combustivel}),
        ...(quilometragem && {quilometragem}),        
        
    }
    :carro
);

carros.splice(0, carros.length, ...carroAtualizados);

const carroEditado = carros.find(c => c.id === idParaEditar);
res.status(200).json({
    success: true,
    message: "Dados atualizados com sucesso",
    carro: carroEditado,
});

}

export { getAllCarros, getCarrosById, createCarro, deleteCarro, updateCarro };