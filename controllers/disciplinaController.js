import Disciplina from '../models/disciplinaModel.js';

export const getAllDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll();
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disciplinas', error: error.message });
    }
};

export const createDisciplina = async (req, res) => {
    try {
        const novaDisciplina = await Disciplina.create(req.body);
        res.status(201).json(novaDisciplina);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar disciplina', error: error.message });
    }
};

export const deleteDisciplina = async (req, res) => {
    try {
        await Disciplina.delete(req.params.id);
        res.status(200).json({ message: 'Disciplina apagada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar disciplina', error: error.message });
    }
};
