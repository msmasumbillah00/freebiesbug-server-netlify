const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(cors())

const comments = require("../data/comment.json")

router.get('/', (req, res) => {
    res.send(comments);
});
router.get('/page/:pageId', (req, res) => {
    const allData = comments;
    const selectedData = comments.slice((req.params.pageId * 12) - 12, req.params.pageId * 12)
    res.send(selectedData);
});

router.get('/psd', (req, res) => {
    const seletedData = comments.filter(ele => {
        if (ele.group.includes("PSD")) {
            return true
        }
    })
    res.send(seletedData);
});
router.get('psd/page/:pageId', (req, res) => {
    const seletedData = comments.filter(ele => {
        if (ele.group.includes("PSD")) {
            return true
        }
    })

    const selectedDatafilter = seletedData.slice((req.params.pageId * 12) - 12, req.params.pageId * 12)
    res.send(selectedDatafilter);
});


router.get('/figma', (req, res) => {
    const seletedData = comments.filter(ele => {
        if (ele.group.includes("Figma")) {
            return true
        }
    })
    res.send(seletedData);
});
router.get('/figma/page/:pageId', (req, res) => {
    const seletedData = comments.filter(ele => {
        if (ele.group.includes("Figma")) {
            return true
        }
    })
    const filterData = seletedData.slice((req.params.pageId * 12) - 12, req.params.pageId * 12)
    res.send(filterData);
});







app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
