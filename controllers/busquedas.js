
const getTodo = (req,res) => {

    const busqueda = req.params.busqueda

    res.json({
        ok:true,
        msg:'getTodo',
        busqueda
    })


}

module.exports = {
    getTodo
}