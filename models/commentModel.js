const mongoose = require("mongoose");

// Créer un schéma (fais office de validation)
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    hotel_id: String,
});

// créer un modèle
const Comment = mongoose.model("Comment", commentSchema);

// exporter le modèle
module.exports = Comment;
