import { Printer } from "lucide-react";
import PrintCurrentMealSheet from "@/components/meals/print/PrintCurrentMealSheet";
import ReactDOMServer from "react-dom/server";

const PrintCurrentMealButton = ({ meal }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      const printContent = ReactDOMServer.renderToString(
        <PrintCurrentMealSheet meal={meal} />
      );

      printWindow.document.writeln(`
        <html>
          <head>
            <title>Print</title>
            <style>
              @page { size: A4; margin: 0; }
              body { font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();

      // Wait for the document to load before printing
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
        onClick={handlePrint}
      >
        <Printer size={16} className="mr-2" />
        Print
      </button>
    </div>
  );
};

export default PrintCurrentMealButton;