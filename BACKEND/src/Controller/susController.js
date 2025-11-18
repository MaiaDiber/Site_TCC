import axios from "axios";
import { Router } from "express";
import { getAuthentication } from '../../utils/jwt.js'

const endpointSus = Router();

const autenticador = getAuthentication();

endpointSus.get("/estoques", autenticador, async (req, resp) => {
    const url = "https:"


    const response = await axios.get(url, { params: req.query });


    resp.json(response.data);
});

export default endpointSus;

