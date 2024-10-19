import React from 'react'
import Chart, { ChartConfiguration, ChartItem } from 'chart.js'

type Props = {
    ctx:ChartItem,
    config:ChartConfiguration,
}

export const BarChart = ({ctx,config}: Props) => {

  const chart=new Chart(ctx,config);
  return (
    <div>

    </div>
  )
}