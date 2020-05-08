const passport = require("passport");
const express = require("express");
const router = express.Router();
const path = require("path")
const { generateReport } = require("../../utils/reports/index");
const { FolderCocodoc } = require("../../lib/dao/folderCocodocDao");
const { DataDocument } = require("../../lib/mongodb/documents");
const { config } = require("../../config/index");
const responses = require("../../utils/response/responses");

router.get(
  "/:idFolder",
  passport.authenticate("jwt", { session: false }), //prettier-ignore
  async (req, res, next) => {
    const {
      params: { idFolder }
    } = req;
    const folderService = new FolderCocodoc();
    const dataDocument = new DataDocument();
    console.log("ID-FOLDER:::",idFolder)
    folderService
      .getFolderById(idFolder)
      .then(async resp => {
        try {
          const {
            folder: { name_folder, cod_folder }
          } = resp;
          let dataFolder = await dataDocument.findDataOfFolder({
            query: { idFolder: idFolder }
          });
          if (dataFolder.length === 0) {
            responses.errorResponse(
              res,
              404,
              "La carpeta no tiene ningun registro",
              {documents:0}
            );
          } else {
            let yearRegex = /^[12][0-9]{3}$/;
            let year = null;
            if (yearRegex.test(name_folder)) {
              year = Number(name_folder);
            } else {
              year = "xxxx";
            }
            var workBook = await generateReport({
              nameReport: `REPORT - ${name_folder} - ${cod_folder}`,
              year: year,
              idFolder: cod_folder
            });
            let dirReport = path.join(config.dirReports,`REPORT-${name_folder}-${cod_folder}.xlsx`);
            workBook.write(dirReport);
            setTimeout(() => {
              res.download(dirReport);
            }, 1000);
          }
        } catch (error) {
          next(error)
        }
      })
      .catch(next);
  }
);

module.exports = router;
