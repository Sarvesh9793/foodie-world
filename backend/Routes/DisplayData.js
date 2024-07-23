const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        if (global.foot_item && global.foodCategory) {
            res.send([global.foot_item, global.foodCategory]);
        } else {
            res.status(500).send("Food data not initialized");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
