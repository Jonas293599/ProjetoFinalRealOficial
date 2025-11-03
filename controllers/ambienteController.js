import Ambiente from '../models/ambienteModel.js';

export const getAllAmbientes = async (req, res) => {
    try {
        const ambientes = await Ambiente.findAll();
        res.status(200).json(ambientes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ambientes', error: error.message });
    }
};

export const createAmbiente = async (req, res) => {
    try {
        const novoAmbiente = await Ambiente.create(req.body);
        res.status(201).json(novoAmbiente);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ambiente', error: error.message });
    }
};

export const deleteAmbiente = async (req, res) => {
    try {
        await Ambiente.delete(req.params.id);
        res.status(200).json({ message: 'Ambiente apagado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar ambiente', error: error.message });
    }
};
