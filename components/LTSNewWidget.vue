<style scoped>
.bm--card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bm--card-equal-height .card-footer {
  margin-top: auto;
}
</style>

<template>
  <!-- begin widget -->
  <div class="tile is-parent">
    <article class="tile is-child">
      <div class="card bm--card-equal-height">
        <div class="card-content">
          <div class="columns">
            <div class="column is-three-quarters">
              <div class="media-content">
                <p ref="daysToActive" class="title is-3">0</p>
                <p class="subtitle is-6">
                  Days for
                  <span class="has-text-primary">Node.js {{ newVersion }}</span>
                  to become the new LTS Active version
                </p>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-one-fifth">
              <b-icon icon="progress-clock" size="medium" type="is-info" />
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { CountUp } from 'countup.js'

export default {
  name: 'LTSNewWidget',
  async fetch() {
    const releasesData = await this.$http.$get('/api/releases')
    this.days = releasesData.current.daysRemainingToStartActive
    this.newVersion = releasesData.current.version.substring(1)
  },
  data: () => {
    return {
      days: 0,
      newVersion: ''
    }
  },
  created() {
    this.$nextTick(function() {
      this.animateNumbers(this.$refs.daysToActive, this.days)
    })
  },
  updated() {
    this.animateNumbers(this.$refs.daysToActive, this.days)
  },
  methods: {
    animateNumbers(element, endValue) {
      const countUp = new CountUp(element, endValue)
      if (!countUp.error) {
        countUp.start()
      }
    }
  }
}
</script>
