const xl = require("excel4node");

const IMG = "public/img/logo_cocotog.jpeg";

const { DataDocument } = require("../../lib/mongodb/documents");

const generateHeader = async ({ nameReport, year, workSheet, workBook }) => {
  const headerStyleTitle = workBook.createStyle({
    font: {
      bold: true,
      size: 20
    },
    alignment: {
      horizontal: ["center"],
      vertical: ["center"],
      wrapText: true
    }
  });
  const headerStyleSubtitle = workBook.createStyle({
    font: {
      size: 11
    },
    alignment: {
      horizontal: ["center"],
      vertical: ["center"],
      wrapText: true
    }
  });

  const dataSheetHeaderTitle = workBook.createStyle({
    font: {
      bold: true,
      size: 12
    },
    alignment: {
      horizontal: ["center"],
      vertical: ["center"],
      wrapText: true
    },
    border: {
      left: {
        style: ["thin"]
      },
      right: {
        style: ["thin"]
      },
      top: {
        style: ["thin"]
      },
      bottom: {
        style: ["thin"]
      }
    }
  });

  const dataSheetHeaderSubtitle = workBook.createStyle({
    font: {
      bold: true,
      size: 10
    },
    alignment: {
      horizontal: ["left"],
      vertical: ["center"],
      wrapText: true
    },
    border: {
      left: {
        style: ["thin"]
      },
      right: {
        style: ["thin"]
      },
      top: {
        style: ["thin"]
      },
      bottom: {
        style: ["thin"]
      }
    }
  });

  const dataSheetHeader = workBook.createStyle({
    font: {
      bold: true,
      size: 10
    },
    alignment: {
      horizontal: ["center"],
      vertical: ["center"],
      wrapText: true
    },
    border: {
      left: {
        style: ["thin"]
      },
      right: {
        style: ["thin"]
      },
      top: {
        style: ["thin"]
      },
      bottom: {
        style: ["thin"]
      }
    }
  });

  workSheet.addImage({
    path: IMG,
    type: "picture",
    position: {
      type: "twoCellAnchor",
      from: {
        col: 2,
        colOff: 0,
        row: 1,
        rowOff: 0
      },
      to: {
        col: 4,
        colOff: 0,
        row: 6,
        rowOff: 0
      }
    }
  });
  workSheet
    .cell(1, 4, 2, 10, true)
    .string("COMUNA SAN JOSE DE COCOTOG")
    .style(headerStyleTitle);

  workSheet
    .cell(3, 4, 3, 10, true)
    .string(
      "FUNDADA JURÍDICAMENTE CON ACUERDO MINISTERIAL N° 821 DEL 15 DE JUNIO DE 1948"
    )
    .style(headerStyleSubtitle);

  workSheet
    .cell(4, 4, 4, 10, true)
    .string(
      "PARROQUIA: ZÁMBIZA  CANTÓN: QUITO    PROVINCIA: PICHINCHA    ECUADOR"
    )
    .style(headerStyleSubtitle);

  workSheet
    .cell(7, 2, 7, 11, true)
    .string("INVENTARIO DOCUMENTAL INTERNO POR EXPEDIENTE")
    .style(dataSheetHeaderTitle);

  workSheet
    .cell(9, 2, 9, 6, true)
    .string("UNIDAD PRODUCTORA: COMUNA SAN JOSÉ DE COCOTOG")
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(9, 7, 9, 11, true)
    .string("NOMBRE SUBSERIE: ")
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(10, 2, 10, 6, true)
    .string(`NOMBRE DE LA SERIE: GESTIÓN DOCUMENTAL`)
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(10, 7, 10, 11, true)
    .string("CÓDIGO DEL EXPEDIENTE:")
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(11, 2, 11, 6, true)
    .string(`NOMBRE DEL EXPEDIENTE: ${nameReport}`)
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(11, 7, 11, 11, true)
    .string(`AÑO: ${year}`)
    .style(dataSheetHeaderSubtitle);

  workSheet
    .cell(13, 1, 14, 1, true)
    .string("No.")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 2, 14, 2, true)
    .string("No. DOCUMENTO")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 3, 14, 3, true)
    .string("FECHA DOCUMENTO")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 4, 14, 6, true)
    .string("NOMBRE DEL DOCUMENTO")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 7, 14, 7, true)
    .string("NUMERO DE HOJAS")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 8, 14, 8, true)
    .string("SERIE")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 9, 14, 9, true)
    .string("CARPETA")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 10, 14, 10, true)
    .string("OBSERVACIONES")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 11, 14, 11, true)
    .string("EXISTE")
    .style(dataSheetHeader);

  workSheet
    .cell(13, 12, 14, 12, true)
    .string("RESPONSABLE")
    .style(dataSheetHeader);
};

const generateDataRow = async ({ idFolder, workBook, workSheet }) => {
  const headerStyleSubtitle = workBook.createStyle({
    font: {
      size: 11
    },
    alignment: {
      horizontal: ["center"],
      vertical: ["center"],
      wrapText: true
    },
    border: {
      left: {
        style: ["thin"]
      },
      right: {
        style: ["thin"]
      },
      top: {
        style: ["thin"]
      },
      bottom: {
        style: ["thin"]
      }
    }
  });
  let store = new DataDocument();
  var docs = await store.findDataOfFolder({
    query: { idFolder: idFolder }
  });
  let numberTotalOfSheets = 0;
  let dateTime = [];
  for (let i = 0; i < docs.length; i++) {
    const element = docs[i];
    workSheet
    .cell(i + 15, 1, i + 15, 1, true)
    .number(i + 1)
    .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 2, i + 15, 2, true)
      .string(element.idDoc)
      .style(headerStyleSubtitle);

    var newDate = new Date(element.broadcastDate);
    workSheet
      .cell(i + 15, 3, i + 15, 3, true)
      .string(
        `${newDate.getDate() + 1}/${newDate.getMonth() +
          1}/${newDate.getFullYear()}`
      )
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 4, i + 15, 6, true)
      .string(element.title.toUpperCase())
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 7, i + 15, 7, true)
      .number(parseInt(element.numberOfSheetsOriginalDocument))
      .style(headerStyleSubtitle);
    numberTotalOfSheets += parseInt(element.numberOfSheetsOriginalDocument);

    workSheet
      .cell(i + 15, 8, i + 15, 8, true)
      .string(element.segment)
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 9, i + 15, 9, true)
      .string(
        element.location
          .split("/")
          [element.location.split("/").length - 2].toUpperCase()
      )
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 10, i + 15, 10, true)
      .string(element.responsibleObservation)
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 11, i + 15, 11, true)
      .string(element._id ? "Si" : "No")
      .style(headerStyleSubtitle);

    workSheet
      .cell(i + 15, 12, i + 15, 12, true)
      .string(element.user.CEDULA)
      .style(headerStyleSubtitle);
  }

  workSheet
    .cell(docs.length + 15, 6, docs.length + 15, 6, true)
    .string("Total de hojas")
    .style({
      font: { bold: true },
      alignment: { horizontal: ["center"], vertical: ["center"] },
      border: {
        left: {
          style: ["thin"]
        },
        right: {
          style: ["thin"]
        },
        top: {
          style: ["thin"]
        },
        bottom: {
          style: ["thin"]
        }
      }
    });
  workSheet
    .cell(docs.length + 15, 7, docs.length + 15, 7, true)
    .number(numberTotalOfSheets)
    .style(headerStyleSubtitle);
  workSheet
    .cell(docs.length + 18, 4, docs.length + 20, 6, true)
    .string("Firma")
    .style({
      font: { bold: true },
      alignment: { horizontal: ["center"], vertical: ["bottom"] },
      border: {
        left: {
          style: ["thin"]
        },
        right: {
          style: ["thin"]
        },
        top: {
          style: ["thin"]
        },
        bottom: {
          style: ["thin"]
        }
      }
    });
  workSheet
    .cell(docs.length + 18, 7, docs.length + 20, 9, true)
    .string("Sello")
    .style({
      font: { bold: true },
      alignment: { horizontal: ["center"], vertical: ["bottom"] },
      border: {
        left: {
          style: ["thin"]
        },
        right: {
          style: ["thin"]
        },
        top: {
          style: ["thin"]
        },
        bottom: {
          style: ["thin"]
        }
      }
    });
};

const generateReport = async ({ nameReport, year, idFolder }) => {
  let workBook = new xl.Workbook();
  var workSheet = workBook.addWorksheet(`Reporte`, {
    sheetFormat: { baseColWidth: 15, defaultRowHeight: 25 }
  });
  await generateHeader({
    nameReport: nameReport,
    year: year,
    workSheet: workSheet,
    workBook: workBook
  });
  await generateDataRow({ workBook: workBook, workSheet: workSheet, idFolder: idFolder });
  return workBook;
};

module.exports.generateReport = generateReport
// generateReport({nameReport:'ALCANTARILLADO',year:2016, idFolder:'1583600276709'})
// .then(workBook=>{
//   workBook.write(`${Date.now()}-TEST-IMAGEN.xlsx`);
// })
// .catch(console.error)
