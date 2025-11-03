import Area from '../models/areaModel.js';

export const getAllAreas = async (req, res) => {
    try {
        const areas = await Area.findAll();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar áreas', error: error.message });
    }
};

export const createArea = async (req, res) => {
    try {
        const novaArea = await Area.create(req.body);
        res.status(201).json(novaArea);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar área', error: error.message });
    }
};

export const deleteArea = async (req, res) => {
    try {
        await Area.delete(req.params.id);
        res.status(200).json({ message: 'Área apagada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar área', error: error.message });
    }
};
