import { Fragment } from "react";
import { useDndDataContext } from "../provider";
import DropZone from "../DropZone";
import { ILayoutItem } from "../../types";
import Row from "../Row";
import "./index.scss";

const Canvas = () => {
  const { layout, components } = useDndDataContext();

  const renderRow = (row: ILayoutItem, currentPath: string) => {
    return (
      <Row key={row.id} data={row} components={components} path={currentPath} />
    );
  };

  return (
    <div className="editor">
      <div className="editor-container">
        <div className="content">
          {layout.map((row, rowIndex) => {
            const currentPath = `${rowIndex}`;
            return (
              <Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                />
                {renderRow(row, currentPath)}
              </Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            isLast
          />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
