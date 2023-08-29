import { BreakLine, CharacterSet, PrinterTypes, ThermalPrinter } from "node-thermal-printer";
import config from "../config";

const PrinterInstance = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: config.printer.interface,
    characterSet: CharacterSet.PC850_MULTILINGUAL,
    removeSpecialCharacters: false,
    breakLine: BreakLine.WORD,
    options: {
        timeout: 5000
    }
})

export default PrinterInstance