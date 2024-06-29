const express = require('express');
const { response } = require('../app');
const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).json({
        "message": "Success",
        "data" : "Successfully hitted"
    });
});


module.exports = router;