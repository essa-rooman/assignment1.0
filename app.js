const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const sha256 = require("sha256");
const fs = require("fs").promises;
const ejs = require("ejs");
const router = express();
router.use(express.json({ extended: true }));
router.use(express.static(__dirname + "/views/images"));
router.set("view engine", "ejs");
var CryptoJS = require("crypto-js");
router.use(
  fileUpload({
    overwrite: false,
    createParentPath: true,
    limits: { fileSize: 4 * 1024 * 1024 },
  })
);

router.get("/fileUpload", async (req, res, next) => {
  res.render("fileUpload");
});
router.get("/text", async (req, res, next) => {
  res.render("text");
});
router.get("/", async (req, res, next) => {
  res.render("index");
});

router.post("/upload", async (req, res, next) => {
  try {
    const file = req.files.mFile;
    const savePath = path.join(__dirname, "public", "uploads1", file.name);
    await file.mv(savePath);
    let objJsonStr1 = JSON.stringify(savePath);
    var base64str1 = Buffer.from(objJsonStr1).toString("base64");
    // const plain = Buffer.from(base64str1, "base64").toString("utf8");
    const hash1 = await sha256(base64str1);
    let result;
    const file1 = req.files.mFile1;
    const savePath1 = path.join(__dirname, "public", "uploads1", file1.name);
    await file1.mv(savePath1);
    let objJsonStr = JSON.stringify(savePath1);
    var base64str = Buffer.from(objJsonStr).toString("base64");
    const hash2 = await sha256(base64str);
    if (hash1 == hash2) {
      result = "matched";
      res.render("resp1.ejs", {
        hash1,
        hash2,
        result,
        file,
        file1,
        base64str1,
      });
    } else {
      result = "Both are different";
      res.render("resp1.ejs", {
        hash1,
        hash2,
        result,
        file,
        file1,
        base64str1,
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Error uploading file");
  }
});
router.post("/text", async (req, res, next) => {
  try {
    const text1 = req.body.text1;
    const hash1 = sha256(text1);
    let result;
    const text2 = req.body.text2;
    const hash2 = sha256(text2);
    console.log(hash1);
    console.log(hash2);
    if (hash1 == hash2) {
      result = "matched";
      res.render("textResult.ejs", {
        hash1,
        hash2,
        result,
        text1,
        text2,
      });
    } else {
      result = "Both are different";
      res.render("textResult.ejs", {
        hash1,
        hash2,
        result,
        text1,
        text2,
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Error uploading file");
  }
});

router.listen(8000, () => console.log("====> server on port 8000"));
