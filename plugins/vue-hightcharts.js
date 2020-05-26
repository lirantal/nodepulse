import Vue from 'vue'

import Highcharts from 'highcharts'
import Gantt from 'highcharts/modules/gantt'
import HighchartsVue from 'highcharts-vue'

if (typeof Highcharts === 'object') {
  Gantt(Highcharts)
}
Vue.use(HighchartsVue)
