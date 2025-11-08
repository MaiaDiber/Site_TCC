import axios from "axios";
import { Router } from "express";

const endpoints = Router();

endpoints.get("/estoques", async (req, resp) => {
    const url = "https://aplicacoes.saude.gov.br/api/bnafar/estoques";


    const response = await axios.get(url, { params: req.query });


    resp.json(response.data);
});

export default endpoints;
