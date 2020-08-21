import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';

const StackedBarChart=(propsData)=>{
  const {dataSource,title, xAxisText, series }=propsData
  return <Paper>
    <Chart id={title} title={title} dataSource={dataSource} >
        <CommonSeriesSettings argumentField="xaxis" type="stackedBar" />
        {(series && series.length  >0)&& series.map((item,key)=><Series valueField={item.value} name={item.name} />)}
        <ValueAxis position="left"> <Title text={xAxisText}/></ValueAxis>
        <Legend verticalAlignment="bottom" horizontalAlignment="center" itemTextPosition="right" />
        <Export enabled={true} />
        <Tooltip enabled={true} location="edge" customizeTooltip={customizeTooltip} />
    </Chart>
  </Paper>
}
const customizeTooltip=(arg)=>{ return { text: `${arg.seriesName } = ${ arg.valueText}` }; }

export default StackedBarChart;