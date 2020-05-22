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
                <p class="title is-3">{{ days }}</p>
                <p class="subtitle is-6">
                  Days for new LTS to go Active
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
export default {
  name: 'LTSNewWidget',
  async fetch() {
    const releasesData = await this.$http.$get('/api/releases')
    this.days = releasesData.newLTS.daysRemainingToStartActive
  },
  data: () => {
    return {
      days: 0
    }
  }
}
</script>
