import React from 'react';
import Paper from '@material-ui/core/Paper';
import PieChart, { Legend, Export, Series, Label, Font, Connector } from 'devextreme-react/pie-chart';

const SimplePieChart=(propsData)=>{
    const { dataSource, title }=propsData
    return <Paper> 
        <PieChart id="pie" paletteExtensionMode="blend" dataSource={dataSource} title={title} >
            <Legend orientation="horizontal" itemTextPosition="right" horizontalAlignment="center" verticalAlignment="bottom" columnCount={4} />
            <Export enabled={true} />
            <Series argumentField="field" valueField="value">
              <Label visible={true} position="columns" customizeText={customizeText}>
                <Font size={16} />
                <Connector visible={true} width={0.5} />
              </Label>
            </Series>
        </PieChart>
  </Paper>
}

function customizeText(arg) { return `${arg.argumentText} (${arg.value}%)`; }
export default SimplePieChart;