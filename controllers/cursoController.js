import Curso from '../models/cursoModel.js';

export const getAllCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cursos', error: error.message });
    }
};

export const createCurso = async (req, res) => {
    try {
        const novoCurso = await Curso.create(req.body);
        res.status(201).json(novoCurso);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar curso', error: error.message });
    }
};

export const deleteCurso = async (req, res) => {
    try {
        await Curso.delete(req.params.id);
        res.status(200).json({ message: 'Curso apagado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar curso', error: error.message });
    }
};
