import React from 'react';
import Paper from '@material-ui/core/Paper';
import SelectBox from 'devextreme-react/select-box';
import { Chart, Series, ArgumentAxis, CommonSeriesSettings, CommonAxisSettings, Grid, Export, Legend, Margin, Tooltip, Label, Format } from 'devextreme-react/chart';

const SimpleLineChart=(propsData)=>{
  const { dataSource,architectureSources, title}=propsData
  return <Paper>
      <Chart palette="Violet" dataSource={dataSource} title={title} >
          <CommonSeriesSettings argumentField="xaxis" type="spline" />
          <CommonAxisSettings> <Grid visible={true} /> </CommonAxisSettings>
          { architectureSources.map((item,key)=>{ return <Series key={key} valueField={item.value} name={item.name} /> })}
          <Margin bottom={20} />
          <ArgumentAxis allowDecimals={false} axisDivisionFactor={60} >
            <Label> <Format type="decimal" /> </Label>
          </ArgumentAxis>
          <Legend verticalAlignment="top" horizontalAlignment="right" />
          <Export enabled={true} />
          <Tooltip enabled={true} />
      </Chart>
  </Paper>
}

export default SimpleLineChart;