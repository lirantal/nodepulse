<template>
  <div class="column is-fullheight">
    <!-- <div v-if="$fetchState.error">
      Could not fetch Author
      {{ $fetchState.error.message }}
    </div>-->
    <!-- <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="5" />
      </content-placeholders>
    </template>
    <template v-else>-->
    <div class="card is-fullheight">
      <header v-if="title" class="card-header">
        <p class="card-header-title has-text-grey">{{ title }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="tile is-ancestor">
            <div class="tile is-child">
              <p class="image is-32x32">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </div>
          </div>
          <div class="tile is-parent"></div>
          <div class="tile is-ancestor">
            <div class="tile is-child">
              <p class="image is-32x32">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </div>
          </div>
        </div>
        <div class="content has-text-centered">
          <p class="subtitle is-6">{{ label }}</p>
        </div>
      </div>
      <footer v-if="footer" class="card-footer">
        <div class="card-footer-item">
          <span>
            {{ footer }}
            <slot />
          </span>
        </div>
      </footer>
    </div>
    <!-- </template> -->
  </div>
</template>
<script>
export default {
  name: 'MetricWidget',
  async fetch() {
    const releasesData = await this.$http.$get('/api/repository')
    this.usersContributedPRs = releasesData.repository.openPRs.nodes
  },
  data: () => {
    return {
      usersContributedPRs: [],
      label: 'recent pull request authors'
    }
  }
}
</script>
