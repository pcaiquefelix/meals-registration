import { MealsDTO } from "@/entities/MealsDTO";

const PrintCurrentMealSheet = ({ meal }: { meal: MealsDTO }) => {
  const description = meal.description?.split("\n");
  const sides = meal.sides?.split("\n");
  const salads = meal.salads?.split("\n");
  const desserts = meal.desserts?.split("\n");

  return (
    <div className="wrap">
      <div className="print-container">
        <div className="print-border">
          <header className="print-header">
            <div className="print-title-container">
              <hr className="print-title-line" />
              <h1 className="print-title">MENU</h1>
            </div>
            <div className="print-header-container">
              <hr className="print-header-bar" />
              <img
                className="print-header-img"
                src="/logo.jpg"
                alt="Lunch Today Restaurant Logo"
              />
            </div>
          </header>
          <section className="print-content">
            <div className="print-grid">
              <div className="print-section">
                {description?.map((line, index) => (
                  <h2 key={index}>{line && <>{line?.toUpperCase()}</>}</h2>
                ))}
              </div>
              <div className="print-section">
                <h2 className="print-category">SIDES</h2>
                <hr className="print-divider" />
                <ul className="print-list">
                  {sides?.map((line, index) => {
                    if (line && index <= 1) {
                      return (
                        <li key={index}>
                          {line && (
                            <>
                              {line[0]?.toUpperCase() +
                                line.substring(1).toLowerCase()}
                            </>
                          )}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="print-section">
                <h2 className="print-category">SALADS</h2>
                <hr className="print-divider" />
                <ul className="print-list">
                  {salads?.map((line, index) => {
                    if (line && index <= 1) {
                      return (
                        <li key={index}>
                          {line && (
                            <>
                              {line[0]?.toUpperCase() +
                                line.substring(1).toLowerCase()}
                            </>
                          )}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="print-section">
                <h2 className="print-category">DESSERTS</h2>
                <hr className="print-divider" />
                <ul className="print-list">
                  {desserts?.map((line, index) => {
                    if (line && index <= 1) {
                      return (
                        <li key={index}>
                          {line && (
                            <>
                              {line[0]?.toUpperCase() +
                                line.substring(1).toLowerCase()}
                            </>
                          )}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <style>{`
        h2 {
          margin: 0px;
        }

        .wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f7fafc;
        }

        .print-container {
          width: 210mm;
          height: 265mm;
          padding: 12mm;
          background: white;
        }

        .print-border {
          width: -webkit-fill-available;
          height: 100%;
          border: 8px solid black;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .print-header {
          width: 91.6667%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .print-title-container {
          position: relative;
          width: 100%;
          height: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .print-header-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .print-title-line {
          width: 100%;
          border: 2px solid black;
        }

        .print-title {
          position: absolute;
          font-size: 3rem;
          font-weight: bold;
          background: white;
          padding: 0 1rem;
          border-left: 2px solid black;
          border-right: 2px solid black;
        }

        .print-header-bar {
          width: -webkit-fill-available;
          border: 4rem solid #374151;
          background-color: #374151;
        }

        .print-header-img {
          position: absolute;
          width: 13rem;
        }

        .print-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .print-grid {
          width: 83.3333%;
          display: grid;
          grid-template-rows: repeat(4, 1fr);
          gap: 1rem;
          height: 95%;
        }

        .print-section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .print-category {
          font-weight: bold;
        }

        .print-divider {
          width: 100%;
          border: 1px solid black;
        }

        .print-list {
          flex-grow: 1;
          margin-top: 1.5rem;
          margin-bottom: 0px;
          padding: 0px;
        }

        li {
          list-style-type: none;
        }
      `}</style>
      </div>
    </div>
  );
};

export default PrintCurrentMealSheet;
