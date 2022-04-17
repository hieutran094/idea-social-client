<template>
  <div class="pb-0 mt-2">
    <h6>Ideas Per Department</h6>
  </div>
  <div class="py-3 mb-3 bg-gradient-dark border-radius-lg pe-1">
    <div class="chart">
      <Bar :chart-data="chartData" :chart-options="options" :height="268" class="bar_chart"/>
    </div>
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)
export default {
  name: 'department-idea-chart',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    Bar,
  },
  data() {
    return {
      labels: [],
      dataCount: [],
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
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              scaleBeginAtZero: true,
              padding: 15,
              font: {
                size: 14,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
              color: '#fff',
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Sales',
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: '#fff',
            data: this.dataCount,
            maxBarThickness: 6,
          },
        ],
      }
    },
  },
  watch: {
    data(data) {
      this.labels = data.labels
      this.dataCount = data.data
    },
  },
}
</script>
