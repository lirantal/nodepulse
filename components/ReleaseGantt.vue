<style scoped>
.hc {
  height: 600px;
}
</style>

<template>
  <div>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else>
      <highcharts
        :constructor-type="'ganttChart'"
        :options="chartOptions"
      ></highcharts>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ReleaseGantt',
  async fetch() {
    const releasesData = await this.$http.$get('/api/releases')
    const chartOptions = {
      title: {
        text: 'Node.js Release Timeline'
      },
      xAxis: {
        min: new Date(releasesData.firstReleaseStartDate).getTime(),
        max: new Date(releasesData.lastReleaseEndDate).getTime(),
        currentDateIndicator: true
      },
      yAxis: {
        uniqueNames: true
      },
      navigator: {
        enabled: true,
        liveRedraw: true,
        series: {
          type: 'gantt',
          pointPlacement: 0.5,
          pointPadding: 0.25
        },
        yAxis: {
          min: 0,
          max: 3,
          reversed: true,
          categories: []
        }
      },
      scrollbar: {
        enabled: true
      },
      rangeSelector: {
        buttons: [
          {
            type: 'all',
            text: 'All'
          },
          {
            type: 'month',
            count: 1,
            text: '1m'
          },
          {
            type: 'month',
            count: 3,
            text: '3m'
          },
          {
            type: 'month',
            count: 6,
            text: '6m'
          },
          {
            type: 'ytd',
            text: 'YTD'
          },
          {
            type: 'year',
            count: 1,
            text: '1y'
          }
        ],
        enabled: true,
        selected: 0
      },
      plotOptions: {
        series: {
          animation: true,
          dataLabels: {
            enabled: true,
            format: '{point.phase}',
            style: {
              cursor: 'default',
              pointerEvents: 'none'
            }
          },
          allowPointSelect: true
        }
      },
      series: [
        {
          name: 'Node.js Release Schedule',
          data: releasesData.releasesSortedDesc
        }
      ]
    }
    this.chartOptions = chartOptions
  },
  data: () => {
    return {
      chartOptions: null
    }
  }
}
</script>
