// import React from 'react'

// import './Tabla.scss'

// const Tabla = (props) => {
//   return(
//     <div>
//       <div
//         className="container-item-tabla"
//         style={{ gridTemplateColumns: props.frame }}
//       >
//         {
//           props.dataCabecera.map((item, i) => {
//             return <div key={i} className="items " >{item}</div>
//           })
//         }
//       </div>
//       {props.children}
//     </div>
//   )
// }

// export default  Tabla

import React from 'react';
import styled from 'styled-components';

// import $ from 'global/styles';

import './Tabla.sass'

const Table = ({ dataCabecera, children, isEmpty, gridTemplateColumns, loading = false, width }) => {
  const listHeaders = () => {
    if (!dataCabecera) return <></>;
    return dataCabecera.map((header, i) => (
      <ItemHead key={i} className="">{header}</ItemHead>
    ));
  };

  return (
    <Wrapper id="table" width={width}>
      <THeader frames={gridTemplateColumns} className="table-header">
        {listHeaders()}
      </THeader>
      <TBody frames={gridTemplateColumns}>
        {loading
          ? <Empty><p>Cargando registros ...</p></Empty>
          : children
        }
        {isEmpty && (
          <Empty>
            <p>No se han encontrado registros</p>
          </Empty>
        )}
      </TBody>
    </Wrapper>
  );
};

export default Table;

const Wrapper = styled.div`
  width: ${({ width }) => width};
`;

const THeader = styled.div`
  display: grid;
  grid-template-columns: ${({ frames }) => frames};
  grid-template-rows: 72px;
  height: 54px;
  border-radius: 10px;
  padding-left: 45px;
  padding-right: 39px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: #2FB7EC;
`;

const TBody = styled.div`
  background:#F7F7F8;
  & > .t-row {
    display: grid;
    grid-template-columns: ${({ frames }) => frames};
    grid-template-rows: 72px;
    & > div {
      display: flex;
      align-items: center;
    }
  }
`;

const ItemHead = styled.div`
  display: flex;
  align-items: center;
  display: inherit;
  color: white;
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.02em;
  text-align: center;
  height: 54px;
  background: #2FB7EC;
`;

const Empty = styled.div`
  background: white;
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  height: 144px;
  width: 100%;
  & > p {
    margin: 0 auto;
    font-family: Calibri;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 144px;
    width: 250px;
    letter-spacing: 0.01em;
    color: gray;
  }
`;
