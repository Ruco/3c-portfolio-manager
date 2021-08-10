import {  makeStyles } from '@material-ui/core/styles';


const MuiClassObject = makeStyles(
    (theme) => ({
      root: {
        border: 0,
        padding: 0,
        fontFamily: 'Open Sans',
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
  
          overflow: "visible",
          textOverflow: "initial",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.1em"
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          textOverflow: "initial",
          padding: 0
        },
        '& .MuiDataGrid-columnHeader': {
          padding: 0
        },
        '& .MuiDataGrid-iconButtonContainer': {
          display: "none"
        },
        '& .MuiDataGrid-columnHeaderWrapper': {
          overflow: "visible"
        },
        '& .MuiDataGrid-row.Mui-even': {
          backgroundColor: 'var(--color-secondary-light87)'
        }
      },
    }),
  );

export {
    MuiClassObject
}