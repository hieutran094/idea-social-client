<template>
  <div class="pb-0 card-header">
    <h6>Ideas Per Day</h6>
  </div>
  <div class="p-3 card-body">
    <div class="chart">
      <Line :chart-data="chartData" :chart-options="options" :height="300" class="line_chart" />
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'idea-by-day-chart',
  components: { Line },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      labels: [],
      dataChart: [],
      gradientStroke2: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#b2b9bf',
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: '#b2b9bf',
              padding: 20,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    }
  },
  mounted() {
    const ctx2 = document.querySelector('.line_chart canvas').getContext('2d')
    this.gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50)
    this.gradientStroke2.addColorStop(1, 'rgba(203,12,159,0.2)')
    this.gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)')
    this.gradientStroke2.addColorStop(0, 'rgba(203,12,159,0)') //purple colors
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Ideas',
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: '#cb0c9f',
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: this.gradientStroke2,
            fill: true,
            data: this.dataChart,
            maxBarThickness: 6,
          },
        ],
      }
    },
  },
  watch: {
    data(data) {
      this.labels = data.labels
      this.dataChart = data.data
    },
  },
}
</script>
