import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });
const legendRootBase = ({ classes, ...restProps }) => ( <Legend.Root {...restProps} className={classes.root} />);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({ label: { whiteSpace: 'nowrap'} });
const legendLabelBase = ({ classes, ...restProps }) => ( <Legend.Label className={classes.label} {...restProps} />);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

const StackedBarChart=(propsData)=>{
    const { chartData, title, max, series }= propsData
    const stackSeries = (series && series.length >0) && series.map((item,key)=>item.name);
    return <Paper>
    <Chart data={chartData} type="stackedBar">
      <ArgumentAxis />
      <ValueAxis max={max} />
        {(series && series.length  >0)&& series.map((item,key)=><BarSeries name={item.name} valueField={item.value}  argumentField="xaxis" />)}
      <Animation />
      <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
      <Title text={title} />
      <Stack stacks={[ { series:stackSeries } ]}/>
    </Chart>
  </Paper>
}

export default StackedBarChart;