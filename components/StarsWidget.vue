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
          <template v-if="$fetchState.pending">
            <content-placeholders>
              <content-placeholders-text :lines="5" />
            </content-placeholders>
          </template>
          <template v-else>
            <div class="columns">
              <div class="column is-three-quarters">
                <div class="media-content">
                  <p class="title is-3">{{ starCount }}</p>
                  <p class="subtitle is-6">Github Stars</p>
                  <div></div>
                  <p class="title is-4">{{ forkCount }}</p>
                  <p class="subtitle is-7">Forks</p>
                </div>
              </div>
              <div class="column"></div>
              <div class="column is-one-fifth">
                <b-icon icon="trending-up" size="medium" type="is-success" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'StarsWidget',
  async fetch() {
    const releasesData = await this.$http.$get('/api/repository')
    this.forkCount = new Intl.NumberFormat().format(
      releasesData.repository.forkCount
    )
    this.starCount = new Intl.NumberFormat().format(
      releasesData.repository.stargazers.totalCount
    )
  },
  data: () => {
    return {
      forkCount: 0,
      starCount: 0
    }
  },
  fetchOnServer: false
}
</script>
