<template>
  <Card :metric="metric" :label="label"></Card>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'MetricWidget',
  components: {
    Card
  },
  props: {
    metric: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
