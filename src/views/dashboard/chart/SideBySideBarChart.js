import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ValueAxis, Title, Series, AdaptiveLayout, CommonSeriesSettings, Legend, Export, Tooltip } from 'devextreme-react/chart';

const SideBySideBarChart=(propsData)=>{
    const  { dataSource, title, architectureSources, xAxisText}= propsData
    return <Paper>  
        <Chart id="chart" title={title} dataSource={dataSource} onPointClick={onPointClick}   >
            <CommonSeriesSettings argumentField="xaxis" type="bar" hoverMode="allArgumentPoints" selectionMode="allArgumentPoints" />
             {(architectureSources && architectureSources.length >0) && architectureSources.map((item,key)=> <Series key={key} valueField={item.value} name={item.name} />)}
            <ValueAxis position="left"> <Title text={xAxisText}/></ValueAxis>
            <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
            <Export enabled={true} />
            <Tooltip enabled={true} />
        </Chart>
  </Paper>
}
const onPointClick=(event)=>{
    event.target.select();
}

export default SideBySideBarChart;