import Calendario from '../models/calendarioModel.js';

// Função para obter todos os eventos e enviá-los como resposta
export const getAllEventos = async (req, res) => {
    try {
        const eventos = await Calendario.findAll();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
    }
};

// Função para criar um novo evento
export const createEvento = async (req, res) => {
    try {
        const novoEvento = await Calendario.create(req.body);
        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
    }
};

// Função para atualizar um evento
export const updateEvento = async (req, res) => {
    try {
        const eventoAtualizado = await Calendario.update(req.params.id, req.body);
        res.status(200).json(eventoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
};

// Função para apagar um evento
export const deleteEvento = async (req, res) => {
    try {
        await Calendario.delete(req.params.id);
        res.status(200).json({ message: 'Evento apagado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar evento', error: error.message });
    }
};
