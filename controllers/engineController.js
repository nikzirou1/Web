const EngineRepository = require("../repository/sequelize/EngineRepository");

exports.addEngine = (req, res, next) => {
    const engineData = { ...req.body };
    EngineRepository.createEngine(engineData)
        .then((result) => {
            res.redirect("/engines");
        })
        .catch((err) => {
            res.render("pages/engine/form", {
                engine: engineData,
                pageTitle: req.__('engine.form.add.pageTitle'),
                formMode: "createNew",
                btnLabel: req.__('engine.form.add.btnLabel'),
                formAction: "/engines/add",
                navLoc: "engine",
                validationErrors: err.errors,
            });
        });
};
exports.updateEngine = (req, res, next) => {
    const engineId = req.body.id;
    const engineData = { ...req.body };
    EngineRepository.updateEngine(engineId, engineData)
        .then((result) => {
            res.redirect("/engines");
        })
        .catch((err) => {
            res.render("pages/engine/form", {
                engine: engineData,
                pageTitle: req.__('engine.form.edit.pageTitle'),
                formMode: "update",
                btnLabel: req.__('engine.form.edit.btnLabel'),
                formAction: "/engines/edit",
                navLoc: "engine",
                validationErrors: err.errors,
            });
        });
};
exports.deleteEngine = (req, res, next) => {
    const engineId = req.params.engineId;
    EngineRepository.deleteEngine(engineId).then(() => {
        res.redirect("/engines");
    });
};

exports.showEngineList = (req, res, next) => {
    EngineRepository.getEngines().then((engines) => {
        res.render("pages/engine/list", {
            engines: engines,
            navLoc: "engine",
        });
    });
};

exports.showAddEngineForm = (req, res, next) => {
    res.render("pages/engine/form", {
        engine: {},
        pageTitle: req.__('engine.form.add.pageTitle'),
        formMode: "createNew",
        btnLabel: req.__('engine.form.add.btnLabel'),
        formAction: "/engines/add",
        navLoc: "engine",
        validationErrors: [],
    });
};

exports.showEditEngineForm = (req, res, next) => {
    const engineId = req.params.engineId;
    EngineRepository.getEngineById(engineId).then((engine) => {
        res.render("pages/engine/form", {
            engine: engine,
            formMode: "edit",
            pageTitle: req.__('engine.form.edit.pageTitle'),
            btnLabel: req.__('engine.form.edit.btnLabel'),
            formAction: "/engines/edit",
            navLoc: "engine",
            validationErrors: [],
        });
    });
};

exports.showEngineDetails = (req, res, next) => {
    const engineId = req.params.engineId;
    EngineRepository.getEngineById(engineId).then((engine) => {
        res.render("pages/engine/form", {
            engine: engine,
            formMode: "showDetails",
            pageTitle: req.__('engine.form.details.tableName'),
            formAction: "",
            navLoc: "engine",
            validationErrors: [],
        });
    });
};
