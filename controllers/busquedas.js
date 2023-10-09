const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require("../models/usuario")


const getTodo = async (req, res) => {

    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ name: regex }),
        Medico.find({ name: regex }),
        Hospital.find({ name: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async (req, res) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i')

    let data = []

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ name: regex })
                .populate('usuario', 'name img')
                .populate('hospital', 'name img')
            break

        case 'hospitales':
            data = await Hospital.find({ name: regex })
                .populate('usuario', 'name img')
            break

        case 'usuarios':
            data = await Usuario.find({ name: regex })
            break

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuaios o medicos o hospitales'
            })
    }

    res.json({
        ok: true,
        resultados: data
    })


}

module.exports = {
    getTodo,
    getDocumentosColeccion
}