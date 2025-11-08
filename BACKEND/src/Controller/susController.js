import axios from "axios";
import { Router } from "express";
import { getAuthentication } from '../../utils/jwt.js'

const endpoints = Router();

const autenticador = getAuthentication();

endpoints.get("/estoques", autenticador, async (req, resp) => {
    const url = "https://aplicacoes.saude.gov.br/api/bnafar/estoques";


    const response = await axios.get(url, { params: req.query });


    resp.json(response.data);
});

export default endpoints;
