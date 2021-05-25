const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');
// MIDDLEWARE
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post("/upload", auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "فایلی برای بارگذاری وجود ندارد" })
        }

        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "عکس انتخاب شده بیش از حد بزرگ است" })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "فایل انتخاب شده مورد قبول نیست" })
        }


        cloudinary.v2.uploader.upload(file.tempFilePath,
            { folder: "public" },
            async (err, result) => {
                if (err) throw err;
                removeTmp(file.tempFilePath)

                res.json({ public_id: result.public_id, url: result.secure_url });
            }
        )

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


router.post("/destroy", auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "عکسی انتخاب نشده است" })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({ msg: "عکس با موفقیت حذف شد" })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router;