import React from 'react';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

const ResourceRateCardTable=(props)=>{
    const {tableData, selectedRateCard, setSelectedRateCard}=props

    // creating columns
    const columns = [
        {   title: "",
            width: 8,
            render: (rowData) => {
              return <Button onClick={() => setSelectedRateCard(rowData)} variant="outlined" color="primary" >Select</Button>
            }
        },
        {   title: 'Domain\u00a0Name', field: 'domainName'},
        {   title: 'Category', field: 'skillCategory' },
        {   title: 'Skill', field: 'skillSet' },
        {   title: 'Exprience', field: 'exp' },
        {   title: 'Rate', field: 'rate' }
    ];

    let data=(tableData && tableData.length >0) && tableData.map((item,key)=>{
        return {"data": item, "rateCardId": item.id,"domainName":item.domainName,"exp":item.fromYearOfExp+"-"+item.toYearOfExp,"rate":item.rate,"skillCategory":item.skillCategory,"skillSet":item.skillSet}
    })
    return <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Rate Card Managment"
          columns={columns}
          data={(data && data.length > 0) ? data : []}
          options={{ headerStyle: { backgroundColor: '#01579b', color: '#FFF' } }}
        />
        <h4>You have Selected : {selectedRateCard.domainName} </h4>
    </div>
}

export default ResourceRateCardTable;